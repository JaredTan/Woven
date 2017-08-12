const passport = require('passport');

const AuthenticationController = require('../controllers/authentication_controller');
const UsersController = require('../controllers/users_controller');
const TodosController = require('../controllers/todos_controller');
const ConnectionController = require('../controllers/connection_controller');
const PlantController = require('../controllers/plant_controller');
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
  .patch(UsersController.update)

// Connection Routes
// -----------------------------------------------------------------------------

router.route('/connection/:connectionId')
  .get(ConnectionController.show)


// Todo Routes
// -----------------------------------------------------------------------------
router.route('/users/:user_id/todos')
  .post(requireAuth, TodosController.create)
  .get(requireAuth, TodosController.index);

router.route('/users/:user_id/todos/:todo_id')
  .delete(requireAuth, TodosController.destroy);

  // Plant Routes
  // -----------------------------------------------------------------------------

  //Add requireAuth back in
router.route('/connection/:connection_id/plant')
.patch(PlantController.update);

router.route('/connection/:connection_id/plant')
.get(PlantController.show);

//-----------------------------------
module.exports = router;

