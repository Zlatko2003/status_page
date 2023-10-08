const express = require('express');
const router = express.Router();
const { URL, checkURLStatus } = require('../schemas/urlSchema');
const { isAuthenticated } = require('../utils/authMiddleware');

router.post('/add', isAuthenticated, async (req, res) => {
    const { name, url } = req.body;

    const formattedUrl = !url.match(/^[a-zA-Z]+:\/\//) ? `http://${url}` : url;

    try {
        const existingUrl = await URL.findOne({ url: formattedUrl });

        if (existingUrl) {
            res.status(409).send('URL already exists');
        } else {
            await URL.create({ name: name, url: formattedUrl });
            res.redirect('/');
        }
    } catch (error) {
        res.status(500).send('Error adding URL');
    }
});

router.post('/delete', isAuthenticated, async (req, res) => {
    const { urlToDelete } = req.body;

    try {
        await URL.findOneAndRemove({ url: urlToDelete });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting URL');
    }
});

module.exports = router;
