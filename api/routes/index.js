const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../utils/authMiddleware');
const { URL, checkURLStatus } = require('../schemas/urlSchema');
const User = require('../schemas/userSchema');

router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Fetch URLs and users
        const urls = await URL.find();
        const users = await User.find();

        // Check status for each URL
        const urlsWithStatus = await Promise.all(
            urls.map(async (url) => {
                const formattedUrl = !url.url.match(/^[a-zA-Z]+:\/\//) ? `http://${url.url}` : url.url;
                const status = await checkURLStatus(formattedUrl);
                return {
                    name: url.name,
                    url: formattedUrl,
                    status,
                };
            })
        );

        res.render('index', { urlsWithStatus, users });
    } catch (error) {
        res.status(500).send('Error retrieving URLs');
    }
});

module.exports = router;
