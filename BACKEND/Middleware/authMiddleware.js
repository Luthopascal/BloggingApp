//Checks the authourization (Jwt)
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const TokenBlacklist = require("../Models (Database schema)/TokenBlacklist")

const authMiddleware = (req,res,next)=> {   // next is required to go to the route. Middle ware runs before the route then moves to next. 
// tokens are sent through headers nor request bodies. All Auth in sent through headers (any type of request (get, post ...))

const token = req.headers['authorization'].split(' ')[1]// Authourization and space
// the above code returns 'Bearer <token>' so we split it and take the second part which is the token itself. the [1] is the second part of the split array.

if (!token){
    res.status(401).json({   //401 means not authorized
        success: false,
        message: 'You are not authorized.'
    })
}

try {
const decoded = jwt.verify(token,'LNXsecret') // verify token with secret key
req.user = decoded; // attaching the decoded info to the request object so that it can be used in the route
next(); // move to the route function (allows you ti use other protected routes like find blog post, uploar etc . only things that are dont after logging in)
} catch(err){
    res.status(401).json({   //invalid token
        success: false,
        message: 'Token not valid.'
    })
}
} //HEADERS ARE THE METADATA OF THE REQUEST (INFO ABOUT THE REQUEST ITSELF)

//The purpose of the middleware is to protect certain routes by ensuring that only requests with valid JWT tokens can access them.
//verifies the user

//can only access protected routes if they are logged in 
//login creates token

module.exports = authMiddleware;
