const express = require('express');
// mongo db connection
require('./db/mongoose');
// routes
const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});