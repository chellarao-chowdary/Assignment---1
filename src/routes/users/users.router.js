const express = require('express');
const {httpGetUsers,
    httpUpdateUser,
    httpDeleteUser
} = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/',httpGetUsers);
usersRouter.patch('/:id',httpUpdateUser);
usersRouter.delete('/:id',httpDeleteUser);

module.exports = usersRouter;