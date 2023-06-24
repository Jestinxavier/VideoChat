const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authcontroller')
const Joi = require('joi');
const validater = require('express-joi-validation').createValidator({});

const auth = require('../middleware/auth')
const registerSchema = Joi.object({
    username :Joi.string().min(3).max(30).required(),
    password:Joi.string().min(2).max(12).required(),
    mail:Joi.string().email().required(),
})

const loginSchema = Joi.object({
    password:Joi.string().min(2).max(12).required(),
    mail:Joi.string().email().required(),
})

// test rout as verify if our middle ware is working
router.get('/test',auth,(req,res)=>{
    res.send("request passed")
})


router.post('/login', validater.body(loginSchema), authController.controllers.postLogin);


router.post('/register',validater.body(registerSchema), authController.controllers.postRegister);

module.exports = router;

