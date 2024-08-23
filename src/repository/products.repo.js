
const productsDatabase = require('../models/products.mongo');

async function getAllProducts(user){
    if(user.role === 'admin'){
        return await productsDatabase.find({},{
            '_id':0,
            '__v':0
        })
    }else{
        return await productsDatabase.find({
            visible : true
        },{
            '_id':0,
            '__v':0
        })
    }
}


async function addProduct(product){
    await productsDatabase.create(product);
}

async function updateProduct(product){
    await productsDatabase.findOneAndUpdate({
        id : product.id
    },product)
}

async function deleteProduct(productId){
    await productsDatabase.findOneAndDelete({
        id : productId
    })
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
}