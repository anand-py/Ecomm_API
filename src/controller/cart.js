
const Cart = require("../model/cart")

exports.getCart = async (req,res,next)=>{
    const cart = await Cart.findByPk(req.params.id)
        if(!cart){
            return res.status(404).json({message : "Cart not found"});
        }
        const products = await cart.getProducts()
            let totalCost = 0;
            
            for (const product of products){
                totalCost+= +product.cost * +product.cartItem.quantity;
                console.log(totalCost)
            }
        return res.status(404).json({
            products : products,
            totalCost : totalCost   
        })
    }
