const Category = require("../model/category")

exports.getCategories = (req,res,next)=>{
    Category.findAll().then((categories)=>{
        res.status(200).json({
           categories ,
        })
    })
    
}

exports.createCategory = (req,res,next)=>{
    Category.create({
        name  : req.body.name,
        description : req.body.description,
    }).then(result=>{
        res.status(201).json({message : "Category Created Successfully"})
    })
}

exports.getCategory = (req,res,next)=>{
    Category.findOne({
        where : {
            id : req.params.id,
        }
    }).then(category=>{
        if(!category){
            res.status(404).json({message : "Category not Found"}) 
        }
        res.status(200).json({category})
    }).catch((error)=>{
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    });
};

exports.deleteCategory = (req,res,next)=>{
    Category.findOne({
        where : {
            id : req.params.id,
        }
    }).then(category =>{
        if(!category){
            res.status(404).json({message : "Category not Found"})
        }
        category.destroy().then((result)=>{
            res.status(200).json({result})
        })
    }).catch((error)=>{
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error)
    });
}

exports.updateCategory = (req,res,next)=>{
    Category.findOne({
        where : {
            id : req.params.id,
        }
    }).then(category =>{
        if(!category){
            res.status(404).json({message : "Category not Found"})
        }
        category.name = req.body.name;
        category.description = req.body.description
        category.save().then(()=>{
            res.status(200).json({message : "Category updated Successully", category},)
        })
}).catch((error)=>{
    if(!error.statusCode){
        error.statusCode = 500;
    }
    next(error)
});

}