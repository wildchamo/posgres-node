const express = require('express');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handle');

const app = express();

app.use(express.json());
routerApi(app);
app.get('/', (req, res) => res.send('Express on Vercel Jose'));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3001, () => {
  console.log(`Prendido papa lindo at http://localhost:3001`);
});

module.exports = app;
