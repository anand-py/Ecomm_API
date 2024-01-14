const product = require("../model/product")

exports.getProducts = (req,res,next)=>{
    product.findAll().then((products)=>{
        res.status(200).json({
           products ,
        })
    })
    
}

exports.createProduct = (req,res,next)=>{
    product.create({
        name  : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }).then(result=>{
        res.status(201).json({message : "Product Created Successfully"})
    })
}

exports.getProduct = (req,res,next)=>{
    product.findOne({
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
    product.findOne({
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
    product.findOne({
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