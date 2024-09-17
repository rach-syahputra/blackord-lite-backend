const express = require('express')
const { verifyToken } = require('../middleware/verifyToken')
const listenerController = require('./listener.controller')

const router = express.Router()

router.get('/:username', verifyToken, listenerController.getListener)
router.post('/', listenerController.addListener)
router.put('/:username', verifyToken, listenerController.updateListener)

module.exports = router
