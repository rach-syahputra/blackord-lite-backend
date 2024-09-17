const express = require('express')
const authController = require('./auth.controller')

const router = express.Router()

router.post('/login', authController.login)
router.get('/refresh-token', authController.refreshToken)
router.delete('/logout', authController.logout)

module.exports = router
