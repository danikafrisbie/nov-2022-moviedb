// GOAL: 
// take the token that is provided by request objet (headers: authorization) 
// check to see if the token is expried. If is expried, provide a response back to the user
// if the token is valid, we will create a variable to contain the user's information based off the ID we captured in token creation

const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const validateSession = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        // above: grabs the token. 
        // below: verify if token is expired. `decodedToken` will show extracted payload, including ID and expiration. Console log it to see! 
        const decodedToken = await jwt.verify(token, process.env.JWT);
        console.log(decodedToken)
        
        const user = await User.findById(decodedToken.id)

        if(!user){
            throw Error ("User Not Found")
        } 

        req.user = user
        req.test = " THIS IS A TEST"
        
        return next();


    } catch (error) {
        res.json({message: error.message})
    }
}








module.exports = validateSession