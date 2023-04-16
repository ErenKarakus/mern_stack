const express = require('express')
const router = express.Router()
const form2sController = require('../controllers/form2sController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(form2sController.getAllForm2s)
    .post(form2sController.createNewForm2)
    .patch(form2sController.updateForm2)
    .delete(form2sController.deleteForm2)

module.exports = router