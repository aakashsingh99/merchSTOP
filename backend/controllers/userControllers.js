import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth Users & get Token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    // res.send({email, password});
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Incorrect Email or Password');
    }
})

// @desc    Register User
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(404);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name, email, password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid User Data');
    }
})

// @desc    Auth Users & get Token
// @route   POST /api/users/login
// @access  Private
export const getUserProfile = asyncHandler(async(req, res) => {
    const user =await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401);
        throw new Error('User not found');
    }
})

// @desc    Update Profile
// @route   PUT /api/users/profile
// @access  Provate
export const updateUserProfile = asyncHandler(async(req, res) => {
    const user =await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        // user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password
        }

        //Update user & get the details
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            // email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('User not found');
    }
})

// @desc    Auth Users & get Token
// @route   GET /api/users/login
// @access  Private/Admin
export const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});
    if(users){
        res.json(users)
    } else {
        res.status(401);
        throw new Error('Something went wrong, user List could not be generated');
    }
})

// @desc    Delete Users
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(user && !(req.user._id).equals(user._id)){
        await user.remove();
        res.json({
            message : 'User Removed'
        })
    } else {
        res.status(401);
        throw new Error('Failed to remove user');
    }
})
