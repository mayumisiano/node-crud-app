const controller = require('../controllers/users');
const router = require('express').Router();

//CRUD Routes /users
router.get('/', controller.getUsers);
router.get('/:userId', controller.getUser);
router.post('/', controller.createuser);
router.put('/:userId', controller.updateUser);
router.delete('/:userId', controller.deleteUser);

module.exports = router;