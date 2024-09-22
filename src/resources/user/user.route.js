const express = require('express')
const userController = require('./user.controller')
const { verifyToken } = require('../../middleware/verification')

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:username', userController.getUser)
router.post('/', userController.addUser)
router.put('/:username', verifyToken, userController.updateUser)
router.delete('/:username', verifyToken, userController.deleteUser)

module.exports = router
