const CartItem = require('../models/cartItem');
const Cart = require('../models/cart');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const cartList = await Cart.find().populate('user');

    if(!cartList){
        return res.status(400).send("No carts available :/");
    }

    res.send(cartList);
})

router.get('/:id', async (req,res)=>{
    const cart = await Cart.findById(req.params.id)
    .populate({path:'cartItem', populate:{path:'item', populate:'category'}});

    if(!cart){
        return res.status(400).send("Cannot display cart :/");
    }

    res.send(cart);
})

router.post('/', async (req,res)=>{

    const cartItemsIds = await Promise.all(req.body.cartItems.map(async (cartItem)=>{
        let newCartItem = new CartItem({
            item:cartItem.item,
            quantity:cartItem.quantity
        })

        newCartItem = await newCartItem.save();

        return newCartItem._id;
    }))

    const cartItemsIdsResolved = await cartItemsIds;

    const totalPrices = await Promise.all(cartItemsIdsResolved.map(async (cartItemId)=>{
        const cartItem = await CartItem.findById(cartItemId).populate('item', 'price');
        return cartItem.item.price * cartItem.quantity
    }))

    const totalPrice = totalPrices.reduce((a,b)=>a+b, 0);

    let cart = new Cart({
        cartItem:cartItemsIdsResolved,
        user:req.body.user,
        totalPrice:req.body.totalPrice
    })

    cart = await cart.save();

    if(!cart){
        return res.status(400).send("Cart cannot be created :/");
    }

    res.send(cart);

})


module.exports = router;
