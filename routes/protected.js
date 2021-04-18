const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, (req, res)=>{
    res.render('protected', {logout: res.logoutBtn ? true : false})
})


module.exports = router