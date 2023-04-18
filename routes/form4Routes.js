const express = require('express')
const router = express.Router()
const form4sController = require('../controllers/form4sController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(form4sController.getAllForm4s)
    .post(form4sController.createNewForm4)
    .patch(form4sController.updateForm4)
    .delete(form4sController.deleteForm4)

module.exports = router