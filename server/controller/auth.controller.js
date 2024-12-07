const http = require('http-status-codes')
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");

// ✅✅✅✅
const register = async (req, res) => {
    const { email, password, confirmPassword } = req.body

    !email && res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Provide an email" });
    !password && res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Provide an password" });
    !confirmPassword && res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Confirm password" });
    password !== confirmPassword && res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Password does not match" });

    try {
        const userExist = await User.findOne({ email });
        userExist && res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Email already registered" });

        // Hashing the password
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            email,
            password: hashedPassword
        })

        res.status(http.StatusCodes.CREATED).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Verify user
        const user = await User.findOne({ email });
        !user && res.status(http.StatusCodes.BAD_REQUEST).json({ msg: 'Invalid credentials' });

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        !isPasswordValid && res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.status(http.StatusCodes.OK).json({ token, msg: "Logged in successfully" })
    } catch (error) {
        res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured"})
    }
}


module.exports = {
    register,
    login
}