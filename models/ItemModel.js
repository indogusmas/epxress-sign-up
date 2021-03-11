const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema =  new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    data_added: {
        type: Date,
        default: Date.now
    },
    image: {
        type:String
    }
});

const Item = mongoose.model('item',ItemSchema);

module.exports = Item;