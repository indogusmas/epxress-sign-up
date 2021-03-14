const express = require('express');

const router = express.Router();

const middleware = require('../middleware/authmiddleware');

const userController = require('../controller/UserController');
const itemController = require('../controller/ItemController');
const cartController = require('../controller/CartController');




router.post('/signUP',userController.signUp);
router.post('/signIn',userController.login);


// API FOR ITEM
router.get('/item', middleware.protect,itemController.getItem);
router.post('/item',itemController.upload,itemController.postItem);
router.put('/item',itemController.updateItem);
router.delete('/item',itemController.deleteItem);
router.post('/uploadImage', itemController.postImage);


//API FOR CART
router.post('/cart',cartController.addToCartItem);
router.get('/cart',cartController.getCartItems);
router.delete('/cart',cartController.delete_item);



module.exports = router;