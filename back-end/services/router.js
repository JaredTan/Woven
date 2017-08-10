const passport = require('passport');

const AuthenticationController = require('../controllers/authentication_controller');
const UsersController = require('../controllers/users_controller');
const TodosController = require('../controllers/todos_controller');
const passportService = require('./passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});
var router = require('express').Router();


// Auth Routes
// -----------------------------------------------------------------------------
router.route('/signup')
  .post(AuthenticationController.signup);
router.route('/signin')
  .post([requireLogin, AuthenticationController.signin]);

// User Routes
// -----------------------------------------------------------------------------

router.route('/users/:user_id')
  .get(UsersController.show)
  .put(requireAuth, UsersController.update);

router.route('/users')
  .get(UsersController.index)
// Todo Routes
// -----------------------------------------------------------------------------
router.route('/users/:user_id/todos')
  .post(requireAuth, TodosController.create)
  .get(requireAuth, TodosController.index);

router.route('/users/:user_id/todos/:todo_id')
  .delete(requireAuth, TodosController.destroy);

module.exports = router;
