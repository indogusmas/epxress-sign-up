const User = require('../models/UserModel.js')
const generateToken = require('../utils/generatetoken');

exports.signUp =  async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        console.log(req.body);
        if(!username || !email || !password ){
            res.status(200).json({
                status:200,
                message: "Data incomplete"
            }); 
        }

        const checkUser = await User.findOne({email});

        if(checkUser){
            res.status(200).json({
                status:200,
                message: "User already exist"
            });
        }
        const userData = new User({
            username : req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        const saveUser = await userData.save();

        res.status(200).json({
            status: 0,
            message: "User Add Successfully",
            data: userData,
        });

    } catch (error) {
        console.log(error);
        res.json({
            message: error,
            status: 404
        })
    }
};

exports.login = async (req,res) => {
    try {
        console.log(req.body);
        const password = req.body.password;
        const email = req.body.email;
        if(!password  || !email){
            res.status(200).json({
                status:200,
                message: "Data incomplete"
            }); 
        }

        const checkUser = await User.findOne({"$and": [{email},{password}]});
        console.log(checkUser);
        if(checkUser){
            checkUser.token = generateToken.generateToken(1);
            res.status(200).json({
                status:0,
                message: "login Success",
                data: checkUser,
                token: generateToken.generateToken(checkUser._id)
                
            });
        }else{
            res.status(200).json({
                status: 1,
                message: "Username / password incorrect"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            status: 404,
            message: error
        });
    }
}