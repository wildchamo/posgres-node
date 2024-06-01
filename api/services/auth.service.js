const boom = require("@hapi/boom");

const UserService = require("./user.service");

const jwt = require("jsonwebtoken");

const service = new UserService();

const nodemailer = require("nodemailer");
const { verifyHash, encryptPassword } = require("../utils/encrypt");
const { config } = require("../config/config");

class AuthService {
  async createUser({ email, password }) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("User not found");
    }
    const isMatch = await verifyHash(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized("Password doesn't match");
    }
    delete user.dataValues.password;
    return user;
  }

  signToken({ user }) {
    const payload = {
      sub: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, config.jwtSecret);

    return { user, token };
  }

  async sendRecoveryLink(email) {
    console.log(email);
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("User not found");
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });

    const link = `myfontent.com/recovery?token=${token}`;
    console.log(service.update);

    await service.update(user.id, { recoveryToken: token });

    const emailToSend = {
      from: `"wildchamo 👻" <${config.email}>`, // sender address
      to: email, // list of receivers
      subject: "Recuperando contraseña", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Ingresa a este link => <a href="${link}">Soy el link</a> </b>` // html body
    };
    const rta = this.sendMail(emailToSend);
    return rta;
  }

  async sendMail(emailToSend) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: config.email,
        pass: config.passwordEmail
      }
    });

    await transporter.sendMail(emailToSend);

    return { message: "message sent" };
  }

  async changePassword({ token, password }) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);

      const userID = payload.sub;

      const user = await service.findOne(userID);
      if (!user || user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const newPassword = await encryptPassword(password);

      await service.update(userID, {
        password: newPassword,
        recoveryToken: null
      });
      return { message: "Password changed successfully" };
    } catch (error) {
      boom.unauthorized();
    }
  }
}

module.exports = AuthService;
