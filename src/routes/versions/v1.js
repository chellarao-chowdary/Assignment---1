const express = require('express');
const authRouter = require('../auth/auth.router');
const productsRouter = require('../products/products.router');
const usersRouter = require('../users/users.router');
const {authMiddleware,isAdminRole} = require('../../middleware/admin.middleware')

const v1Router = express.Router();

v1Router.use('/auth',authRouter);
v1Router.use('/products',authMiddleware,productsRouter);
v1Router.use('/users',authMiddleware,isAdminRole,usersRouter);

module.exports = v1Router;