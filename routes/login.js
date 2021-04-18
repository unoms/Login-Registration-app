const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const { check } = require('express-validator')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, (req, res)=>{
    if(res.logoutBtn){
        res.render('login',  { logout: res.logoutBtn, registration: false, disabled: 'disabled' })
    }else{
        res.render('login',  { logout: res.logoutBtn, registration: false, disabled: '' })
    }
})

//Validation
router.post('/', 
    check('email', 'Email format is wrong. Please, enter a correct email').isEmail(),
    controller.login)

module.exports = router