const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../schemas/userSchema');
const { isAuthenticated } = require('../utils/authMiddleware');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.redirect('/login');  
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;

    User.register(new User({ username }), password, (err, user) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        }
    });
});

router.post('/adduser', (req, res) => {
    const { username, password, email } = req.body;

    User.register({ username, email }, password, (err, user) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
        } else {
            res.redirect('/');
        }
    });
});

router.post('/user_delete', isAuthenticated, async (req, res) => {
    const { username } = req.body;

    try {
        await User.findOneAndRemove({ username: username });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting User');
    }
});

module.exports = router;
