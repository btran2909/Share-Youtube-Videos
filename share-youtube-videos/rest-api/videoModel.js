// videoModel.js
var mongoose = require('mongoose');
// Setup schema
var videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Video model
var Video = module.exports = mongoose.model('video', videoSchema);
module.exports.get = function (callback, limit) {
    Video.find(callback).limit(limit);
}