const express = require('express')
const userController = require('./user.controller')

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:username', userController.getUser)
router.post('/', userController.addUser)
router.put('/:username', userController.updateUser)
router.delete('/:username', userController.deleteUser)

module.exports = router
