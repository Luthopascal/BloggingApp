//Checks the authourization (Jwt)

const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=> {   // next is required to go to the route. Middle ware runs before the route then moves to next. 
// tokens are sent through headers nor request bodies. All Auth in sent through headers (any type of request (get, post ...))

const token = req.headers('Authorization').split(' ')[1]// Authourization and space

if (!token){
    res.status(401).json({   //401 means not authorized
        success: false,
        message: 'You are not authorized.'
    })
}

try {
const decoded = jwt.verify(token,'LNXsecret') // verify token with secret key
Request.user = decoded; // attaching the decoded info to the request object so that it can be used in the route
next(); // move to the route function 
} catch(err){
    res.status(401).json({   //invalid token
        success: false,
        message: 'Token not valid.'
    })
}
} //HEADERS ARE THE METADATA OF THE REQUEST (INFO ABOUT THE REQUEST ITSELF)

//The purpose of the middleware is to protect certain routes by ensuring that only requests with valid JWT tokens can access them.
//verifies the user