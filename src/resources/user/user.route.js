const express = require('express')
const userController = require('./user.controller')
const { verifyToken } = require('../../middleware/verification')

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:username', userController.get)
router.post('/', userController.add)
router.put('/:username', verifyToken, userController.update)
router.delete('/:username', verifyToken, userController.delete)

module.exports = router
