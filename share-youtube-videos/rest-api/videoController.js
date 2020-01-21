// videoModel.js
// Import video model
Video = require('./videoModel');

// Handle index actions
exports.index = function (req, res) {
    Video.get(function (err, videos) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Videos retrieved successfully",
            data: videos
        });
    });
};

// Handle create video actions
exports.share = function (req, res) {
    var video = new Video();
    Video.findOne({
        $or: [
            {user_email: req.body.email},
            {title: req.body.title}
        ]
    }).then(v => {
        if (v) {
            let errors = {};
            if (v.user_email === req.body.email && v.title === req.body.title) {
                errors.message = "Email already exists";
            }
            return res.status(400).json(errors);
        } else {
            video.title = req.body.title;
            video.url = req.body.url;
            video.category = req.body.category;
            video.user_id = req.body.user_id;
            video.user_email = req.body.user_email;
            video.description = req.body.description ? req.body.description : video.description;
            // save the video and check for errors
            console.log('check save video: ', video);
            video.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
                else
                    res.json({
                        message: 'New video shared!',
                        data: video
                    });
            });
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};
// Handle delete video
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.video_id
    }, function (err, video) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Video deleted'
        });
    });
};