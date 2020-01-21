// contactController.js
// Import contact model
Contact = require('./contactModel');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    Contact.findOne({
        $or: [{email: req.body.email}]
    }).then(c => {
        if (c) {
            let errors = {};
            if (c.email === req.body.email) {
                errors.username = "Email already exists";
            }
            return res.status(400).json(errors);
        } else {
            contact.name = req.body.name ? req.body.name : contact.name;
            contact.gender = req.body.gender;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.password = bcrypt.hashSync(req.body.password, salt);
            // save the contact and check for errors
            contact.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
                else
                    res.json({
                        message: 'New contact created!',
                        data: contact
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
// Handle view contact info
exports.login = function (req, res) {
    Contact.findOne({
        $or: [
            {email: req.body.email},
            {password: bcrypt.hashSync(req.body.password, salt)}
        ]
    }).then(c => {
        if (c) {
            let errors = {};
            if (c.email === req.body.email) {
                res.json({
                    message: 'login success!',
                    data: {
                        _id: c._id,
                        name: c.name,
                        gender: c.gender,
                        email: c.email,
                        phone: c.phone
                    }
                });
            }
            return res.status(400).json(errors);
        } else {
            return res.status(404).json(errors);
        }
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.password = bcrypt.hashSync(req.body.password, salt);
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};