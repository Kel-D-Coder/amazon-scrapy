const http = require('http-status-codes')
const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");

// ✅✅✅✅
const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body

    if (!name) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Provide your fullname" });
    }
    if (!email) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Provide an email" });
    }
    if (!password) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Provide a password" });
    }
    if (!confirmPassword) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Confirm password" });
    }
    if (password !== confirmPassword) {
        return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Password does not match" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Email already registered" });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
            name,
            email,
            password: hashedPassword
        })

       return res.status(http.StatusCodes.CREATED).json({ msg: 'User registered successfully' });
    } catch (error) {
       return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Verify user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: 'Invalid credentials' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(http.StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        const { password: userPassword, ...rest } = user._doc

        return res.status(http.StatusCodes.OK).json({ token, msg: "Logged in successfully", info: rest })
    } catch (error) {
        return res.status(http.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error occured"})
    }
}


module.exports = {
    register,
    login
}