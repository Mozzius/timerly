const express = require('express');
const path = require('path');
const jwt = require('express-jwt');

const api = require('./api');

// set secret key
const secret = process.env.SECRET;

const app = express();

// See the react auth blog in which cors is required for access
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(
  jwt({ secret, algorithms: ['HS256'] }).unless({
    path: ['/api/signin', '/api/signup'],
  })
);
app.use('/api', api);

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
