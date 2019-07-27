const router = require('express').Router();

const  User = require("../model/User");

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// validation
const { registerValidation, loginValidation } = require("../validation");

/**
 *  /api/user/register
 *  */
router.post('/register', async (req, res) => {
    console.log("Call to '/register' made");

    // Validate date before creating user
    const { error } = registerValidation(req.body);
    if (error !== null) res.status(400).send(error.details[0].message);
    if (req.body.name === "test") res.send("Register");

    // Checking if the user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send("User (email) already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        console.log("Saved user.");
        res.send({ user: user._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

/**
 * /api/user/login
 *  */
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email exists in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found in database");
    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Password invalid");

    // Create JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send("Logged in");
});

module.exports = router;