const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const postLogin = async (req, res) => {
    try {
    const {mail,password} = req.body;
    const user = await User.findOne({mail:mail.toLowerCase()})
  if(user && bcrypt.compare(password, user.password)){
   

     // creating JWT token
     const token = jwt.sign({
        userId: user._id
    },process.env.TOKEN_KEY,
    {
        expiresIn:'24h'
    }
    ) 


    return res.status(200).json({
        userDetails:{
            mail:user.mail,
            token:token,
            username : user.username,
            id : user._id

        }
    })
  }
  return res.status(400).send('invalid credential please try again later')
} catch(error){
    return res.status(500).send('something went wrong')
  
  }
}

module.exports = postLogin;
