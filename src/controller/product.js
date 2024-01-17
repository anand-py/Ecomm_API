const { validationResult } = require("express-validator")
const Product = require("../model/product")
const { Op } = require('sequelize')

exports.getProducts = (req,res,next)=>{
    let totalItems;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = 5;

        let minCost = req.query.minCost || Number.MIN_VALUE;
        let maxCost = req.query.maxCost || Number.MAX_VALUE;
        Product.findAll({
            where :{ 
                cost : {
                    [Op.gte] : minCost,
                    [Op.lte] : maxCost,
            }
        },
            limit : limit,
        offset : (page-1) * limit
        }).then((products)=>{
            res.status(200).json({
               products ,
            })
        })
   
    Product.count().then((count)=>{
        totalItems = count
    })
  
    
}

exports.createProduct = (req,res,next)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array();
        let responseErrors = extractedErrors.map(err => ({ [err.param]: err.msg }));
        return res.status(400).json({ errors: responseErrors });
    }

   
    Product.create({
        name  : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId: req.body.categoryId 
    }).then(result=>{
        res.status(201).json({message : "Product Created Successfully"})
    })
}

exports.getProduct = (req,res,next)=>{
    Product.findOne({
        where : {
            id : req.params.id,
        }
    }).then(product=>{
        if(!product){
            res.status(404).json({message : "product not Found"}) 
        }
        res.status(200).json({product})
    }).catch((error)=>{
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    });
};

exports.deleteProduct = (req,res,next)=>{
    Product.findOne({
        where : {
            id : req.params.id,
        }
    }).then(product =>{
        if(!product){
            res.status(404).json({message : "product not Found"})
        }
        product.destroy().then((result)=>{
            res.status(200).json({result})
        })
    }).catch((error)=>{
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    });
}

exports.updateProduct = (req,res,next)=>{
    Product.findOne({
        where : {
            id : req.params.id,
        }
    }).then(product =>{
        if(!product){
            res.status(404).json({message : "product not Found"})
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.cost = req.body.cost;
        product.save().then(()=>{
            res.status(200).json({message : "product updated Successully", product},)
        })
}).catch((error)=>{
    if(!error.statusCode){
        error.statusCode = 500;
    }
    next(error)
});

}