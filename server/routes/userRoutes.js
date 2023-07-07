const express = require('express')
const router = express.Router()
const usersController=require('../controllers/usersController')
const verifyJWT=require('../middleware/verifyJWT')

router.route('/')
    .post(usersController.createNewUser)
    // .patch(usersController.updateUser)
    // .delete(usersController.deleteUser)
router.use(verifyJWT)
router.route('/')
    .get(usersController.getAllUsers)


module.exports = router