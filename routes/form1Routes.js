const express = require('express')
const router = express.Router()
const form1Controller = require('../controllers/form1Controller')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(form1Controller.getAllForm1s)
    .post(form1Controller.createNewForm1)
    .patch(form1Controller.updateForm1)
    .delete(form1Controller.deleteForm1)

module.exports = router