var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller')


/* GET users listing. */
router.get('/', userController.getAllUser); 

router.post('/', userController.addNewUser)

router.delete('/:id', userController.deleteUserById)

router.put('/:id', userController.updateUserById)

router.patch('/resetpwd/:id', userController.resetPwdByUserById)

router.patch('/updateAvatar/:id', userController.updateAvatarByUserById)




module.exports = router;
