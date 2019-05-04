'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/user');
const userMiddleware = require('./middlewares/user');
const Response = require('./helpers/response');

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.get(
    '/api/v1/users',
    userController.getUserList
);

app.get(
    '/api/v1/users/:id',
    userMiddleware.validateGetUserById,
    userController.getUserById
);

app.post(
    '/api/v1/users',
    userMiddleware.validateCreateUser,
    userController.createUser
);

app.delete(
    '/api/v1/users/:id',
    userMiddleware.validateDeleteUser,
    userController.deleteUser
);

app.use((err, req, res, next) => {
    return Response.error(res, err)
});

app.listen(PORT, () => {
   console.log(`App listening PORT: ${PORT}`);
});