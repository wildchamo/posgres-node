const express = require("express");
const routerApi = require("./routes");
const checkAPIkey = require("./middlewares/auth.handle.js");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require("./middlewares/error.handle");

const app = express();

app.use(express.json());
routerApi(app);
app.get("/", (req, res) => res.send("Express on Vercel Jose"));
app.get("/hola", checkAPIkey, (req, res) =>
  res.send("Ruta protegida 😈")
);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log(`Prendido papa lindo at http://localhost:3001`);
});

module.exports = app;
