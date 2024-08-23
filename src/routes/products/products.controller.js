const {getAllProducts,addProduct,updateProduct,deleteProduct} = require('../../repository/products.repo')
const logger = require('../../utils/logger');

async function httpGetProducts(req,res){
    try {
        const user = req.user;
        const products = await getAllProducts(user);
        return res.status(200).json({
            status : true,
            message : 'successfully retrived products',
            data : products
        });
    } catch (error) {
        logger.error("Error in httpGetProducts",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
    
}

async function httpAddProduct(req,res){
    try {
        //Todo: Add validations for the req body
        const user = req.user;
        const product = req.body;

        await addProduct({...product,user: 'admin@admin.com'})
        return res.status(201).json({
            status : true,
            message : 'successfully created product',
            data : product
        })
    } catch (error) {
        logger.error("Error in httpAddProduct",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
    
    

}

async function httpUpdateProduct(req,res){
    try {
        //Todo: Add validations for the req body
        const productId = req.params.id;
        const product = req.body;

        await updateProduct({id:productId,...product});
        return res.status(200).json({
            status : true,
            message : 'successfully updated product',
            data : product
        })
    } catch (error) {
        logger.error("Error in httpUpdateProduct",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
    
}

async function httpDeleteProduct(req,res){
    try {
        const productId = req.params.id;
        //Todo: Add validations for the req params
        await deleteProduct(productId);
        return res.status(200).json({
            status : true,
            message : 'successfully deleted product',
            data : productId
        })
    } catch (error) {
        logger.error("Error in httpDeleteProduct",error)
        return res.status(500).json({
            status : false,
            message : error.message,
            data : []
        })
    }
    

}

module.exports = {
    httpGetProducts,
    httpAddProduct,
    httpUpdateProduct,
    httpDeleteProduct
}