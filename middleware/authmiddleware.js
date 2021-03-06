const User = require("../models/UserModel");
const jwt =  require('jsonwebtoken');
const { errorHandler } = require("./errorMiddleware");

const protect = async (req, res,next) => {

    let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({
        status: 401,
        message: 'Not authorized, no token'
    })
    }
  }

  if (!token) {
    res.status(401).json({
        status: 401,
        message: 'Not authorized, no token'
    })
  }
}

module.exports = {protect}