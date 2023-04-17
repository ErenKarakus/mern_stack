const express = require('express')
const router = express.Router()
const form3sController = require('../controllers/form3sController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(form3sController.getAllForm3s)
    .post(form3sController.createNewForm3)
    .patch(form3sController.updateForm3)
    .delete(form3sController.deleteForm3)

module.exports = router