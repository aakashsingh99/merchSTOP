import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

export const protect = asyncHandler(async(req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
        } catch(error){
            console.error(error);
            res.status(401)
            throw new Error('Not Authorized, Token Invalid');
        }
    } else{
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
    next();
})

export const checkAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized: ADMIN only')
    }
}