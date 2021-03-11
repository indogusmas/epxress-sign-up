const Item = require('../models/ItemModel');
const multer = require('multer');


const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  
  //upload parameters for multer
module.exports.upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
}).single('image');

module.exports.postImage = async (req, res) => {
    res.json({
        path: req.file.path
    });
}



module.exports.getItem =  async (req, res) => {
    Item.find().sort({date:-1})
        .then((items) => res.json(items));
}

module.exports.postItem = async (req,res) => {
    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.file.path
    });
    newItem.save().then(item => res.json(item));
}

module.exports.updateItem = async (req,res) => {
    Item.findByIdAndUpdate({_id: req.params.id},req.body)
        .then((item) => {
            Item.findOne({_id: req.params.id})
            .then((item)=>{
                res.json(item);
            })
        });
};

module.exports.deleteItem = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id})
        .the(function(item){
            res.json({
                success: true,
                data: item
            })
        })
}