const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// app.use('/api', require('./routes/users.api.route'));
app.use('/api', require('./routes/blogs.api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});


app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});


app.listen(PORT, () => console.log({
  HOME: `http://localhost:${PORT}`,
  User_Home: `http://localhost:${PORT}/users`,
  Blog_App_Home: `http://localhost:${PORT}/blog_app`
}));
