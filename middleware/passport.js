const User = require('../models/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;

//The verify callback for local authentication accepts username and password arguments, 
//which are submitted to the application via a login form.
//Since we pass to the body parser email (not username), we have to pass the following object
module.exports = (passport) =>{

    passport.serializeUser(function(user, done) {
        done(null, user._id); //Write user.id into a session
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    async function(username, password, done) {
        try{
            const candidate = await User.findOne({email: username})
            if(candidate){
                if(await bcrypt.compare(password, candidate.password)){
                    return done(null, candidate, 'Successful Login')
                }else{
                    return done(null, false, 'Wrong password')
                }
            }else{//There's not an email in our DB
                //In real app we may return another answer 
                return done(null, false, 'Wrong email. Please, try another one')
            }
        }catch(e){
            console.error(`Error checking user in DB. Error: ${e}`)
            return done(e)
        }
    }
))
}