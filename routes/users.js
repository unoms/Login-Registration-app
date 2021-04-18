const {Router} = require('express')
const router = Router()
const controller = require('../controllers/users')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, controller)

module.exports = router