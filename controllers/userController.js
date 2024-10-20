const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // change bcrypt with a different hash technique later
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler (async(req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvaialble = await User.findOne({email});
    // user already exist s
    if (userAvaialble) {
        res.status(400);
        throw new Error("User is already registered")
    }

    // Create a hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username, 
        email,
        password:hashedPassword,
    });

    console.log(`User Created ${user}`)
    if (user) {
        res.status(201).json({_id: user.id, email: user.email})
    }else {
        res.status(400);
        throw new Error("User data not valid");
    }

    res.json({message: "Register the user"});
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler (async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        req.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    // compare password with the hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accessToken});
    }else {
        res.status(401)
        throw new Error("Email or password is not valid");
    }
});

//@desc current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler (async(req, res) => {
    res.json({message: "Current user information"});
});

module.exports = {registerUser, loginUser, currentUser};