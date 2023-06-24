const User = require('../../models/User');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {isValidObjectId} = require('mongoose')


// This controller is for register
const postRegister =  async (req,res)=>{
    try {
        const {username,password,mail} = req.body;
        const userExist  = await User.exists({mail})

        // Checking the email is already exist or not
        if(userExist){
            return res.status(409).send('The email is already in use')
        }
        // This will encrypt the password
        const encryptedPassword = await bcrypt.hash(password,10)

        // Creating user document and save it in database
        const user = User.create({
            username,
            mail:mail.toLowerCase(),
            password:encryptedPassword
            
        })

        // creating JWT token
        const token = jwt.sign({
            userId: user._id
        },process.env.TOKEN_KEY,
        {
            expiresIn:'24h'
        }
        ) 

      return  res.status(201).json({
            userDetails:{
                mail:user.mail,
                tocken:token,
                username:user.username,
                id:user._id
            }
        })
       

    } catch (error) {
        return res.status(500).send("Error occurred. Please try again.")
    }
}

module.exports = postRegister;