const express = require('express');
const {httpAddProduct,
    httpGetProducts,
    httpDeleteProduct,
    httpUpdateProduct
} = require('./products.controller');

const {isAdminRole} = require('../../middleware/admin.middleware')

const productsRouter = express.Router();

productsRouter.get('/',httpGetProducts);
productsRouter.post('/',httpAddProduct);
productsRouter.patch('/:id',isAdminRole,httpUpdateProduct);
productsRouter.delete('/:id',isAdminRole,httpDeleteProduct);

module.exports = productsRouter;