const { validationResult } = require("express-validator")
const passport = require('passport')

module.exports.login = async function(req, res, next){
    const validationErrors = validationResult(req)
    if(validationErrors.isEmpty()){//Check for errors during validation
        //PssportJS authentication
        //info - is a message from middleware/passport.js
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err) }
            if (!user) { return res.status(401).json({errors: [{msg: info}]}) }
            
            req.logIn(user, function(err) {
                if (err) { return next(err) }
                    return res.json({success: {msg: info}})
            });
        })(req, res, next);
    }else{//Send errors during validation
        return res.status(401).json({errors: validationErrors.errors})
    }
}
