const express = require('express')
const authController = require('./auth.controller')
const { verifyToken } = require('../../middleware/verification')

const router = express.Router()

router.post('/login', authController.login)
router.get('/refresh-token', authController.refreshToken)
router.delete('/logout', verifyToken, authController.logout)

module.exports = router
