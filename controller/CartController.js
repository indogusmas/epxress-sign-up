const Cart = require('../models/CartModel');
const Item = require('../models/ItemModel');

module.exports.getCartItems = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({userId});
        console.log(cart);
        if(cart && cart.Items.length > 0){
            res.send(cart);
        }else{
            res.send(null);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(`Error ${error}`);
    }
}

module.exports.addToCartItem = async (req, res) => {
    const userId = req.body.userId;
    const {productId, quantity } = req.body;
    try {
        let cart  = await Cart.findOne({userId});
        let item = await Item.findOne({_id: productId});
        if(!item){
            res.status(404).send('Item not found');
        }
        const price = item.price;
        const name = item.title;
        if(cart){
            let itemIndex = cart.items.findIndex(p => p.productId == productId);
            //Check if product exists or not
            if(itemIndex > -1)
            {
                let prodcutItem = cart.items[itemIndex];
                prodcutItem.quantity += quantity;
                cart.items[itemIndex] = prodcutItem;
            }else{
              cart.items.push({
                  productId,name,quantity,price
              });
            }
            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }else{
            //no cart exists, create one
            console.log(item);
            const newCart = await Cart.create({
                userId,
                items: [{
                    productId,
                    name,
                    quantity,
                    price
                }],
                bill: quantity * price
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Something wrong ${error}`);
    }
}

module.exports.delete_item = async (req,res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
   
    try{
        let cart = await Cart.findOne({userId});
        
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(` errorr ${err}`);
    }
}