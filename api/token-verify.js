const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "hola";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNTI3MTIzNn0.SVXiBneGX7joDEq0r4RMBr7CHYgeYxfiCHXi2_GlguA";

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
