const User = require('../models/User')

module.exports = async function(req, res){
    try{
        const users = await User.find({})
        res.json(users)
    }catch(err){
        console.error(err)
        res.status(500).send('Internal Error')
    }
}