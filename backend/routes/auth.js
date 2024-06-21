const express = require('express')
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'Hello@bhai';

// Route 1:  Create a User : POST "/api/auth". Doesn't require Auth

router.post('/createuser',[
    body('name', "Enter a valid Name").isLength({min: 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min: 5})
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors:errors.array() });
    }
    // Check whether email exist

    try {
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})

// Route 2: Authenticating a User : POST "/api/auth".

router.post('/login',[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be empty").exists()
], async (req, res)=>{
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            return res.status(400).json({error: "Please login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})

// Route 3: Get Loggedin User details using: POST "/api/auth/getuser", Login required

router.post('/getuser', fetchUser, async (req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occurred")
    }
})
module.exports= router