const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator")

module.exports.registration = async function(req, res){

    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){//Check for errors during validation
    const {email, password } = req.body
        try{
            const canndidate = await User.findOne({email: email})
            if(canndidate){
                return res.status(401).json({errors: [{msg: 'The email is occupied'}]})
            }

            //Adding an user to DB
            const salt = await bcrypt.genSalt(10); //10 is a length of hash
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new User({
                email: email,
                password: hashedPassword,
                role: new Role()
            })
            await user.save()
            res.json({success: {msg: "You have successfully been registered"}})

            }catch(e){
                console.error(e)
            }
    }else{
        //Send errors during validation
        return res.status(401).json({errors: validationErrors.errors})
    }    
}

