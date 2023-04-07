const express = require('express')
const router = express.Router()
const form1sController = require('../controllers/form1sController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(form1sController.getAllForm1s)
    .post(form1sController.createNewForm1)
    .patch(form1sController.updateForm1)
    .delete(form1sController.deleteForm1)

module.exports = router