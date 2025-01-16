const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../model/user")


require("dotenv").config()

const SignUp = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await userModel.findOne({ email: email })
        if (user) {
            return res.status(409).json({ error: "Email already exists" })
        }
        const hashed = await bcrypt.hash(password, 10)
        user = await userModel.create({ password: hashed, email })
        res.status(201).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ error: "User is not found" })
        }
        const compare = await bcrypt.compare(password, user.password)
        if (compare == false) {
            return res.status(401).json({ error: "Login Failed" })
        }
        const token = jwt.sign({
            payload: {
                userId: user._id
            }
        }, process.env.JWT_SECRET
        )
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 10 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ token, message: "login successfully" })

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const GetAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search=""} = req.query
        let query = {}
        if (search) {
            query.name = {$regex:search, $options:"i"}
        }

        const users = await userModel.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 })
        
        const usersNumber = await userModel.countDocuments(query);
        
        res.status(200).json({
            users,
            totalPages: Math.ceil(usersNumber / limit),
            currentPage: page,
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}


const SignInWithGoogle = async (req, res) => {
    try {
        const { email } = req.user
        let user = await userModel.findOne({ email: email })
        if (!user) {
            user = await userModel.create({ email: email })
        }
        const token = jwt.sign({
            payload: {
                userId: user._id
            }
        }, process.env.JWT_SECRET
        )
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 10 * 24 * 60 * 60 * 1000 });
        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res.status(400).json("error loading google account")
    }
}



module.exports = { SignUp, LogIn, SignInWithGoogle, GetAllUsers }