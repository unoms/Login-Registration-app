const express = require('express')
const router = express.Router()
const controller = require('../controllers/registration')
const { check } = require('express-validator')
const checkAuth = require('../middleware/checkAuth')

console.log('controller', controller)

router.get('/', checkAuth, (req, res)=>{
    if(res.logoutBtn){
        res.render('registration',  { logout: res.logoutBtn, registration: false, disabled: 'disabled' })
    }else{
        res.render('registration',  { logout: res.logoutBtn, registration: false, disabled: '' })
    }
})

//Validation
router.post('/', 
    check('email', 'Email format is wrong. Please, enter a correct email').isEmail(),
    check('password', 'Password should be at least 8 characters').isLength({ min: 8 }),
    controller.registration)

module.exports = router