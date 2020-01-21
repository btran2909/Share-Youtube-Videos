// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to Funny Videos!',
    });
});
// Import contact controller
var contactController = require('./contactController');
var videoController = require('./videoController');
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contacts/:contact_id')
    .post(contactController.login)
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

router.route('/login').post(contactController.login)

//Video routes
router.route('/videos')
    .get(videoController.index)
    .post(videoController.share);

router.route('/videos/:video_id')
    .delete(videoController.delete);

// Export API routes
module.exports = router;