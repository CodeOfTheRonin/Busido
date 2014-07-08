var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app) {

    app.get('/admin', function (req, res, next) {
        res.redirect('templates/admin_panel/index.html');
    });

    app.get('/', function (req, res, next) {
        //res.render('index');
        res.redirect('index.html');
    });

    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) throw err;

            res.json(users);
        });
    });

    app.get('/user/:id', function (req, res, next) {
        try {
            var id = new ObjectID(req.params.id);
        } catch (e) {
            next(404);

            return;
        }

        User.findById(id, function(err, user) {
            if (err) return next(err);
            if (!user) {
                return next(404);
            }

            res.json(user);
        });
    });
};

