const mongoose = require('mongoose');
const request = require('request');

const urlSchema = new mongoose.Schema({
    name: String,
    url: String,
    status: String,
});

const URL = mongoose.model('URL', urlSchema);

async function checkURLStatus(url) {
    return new Promise(async (resolve) => {
        const httpsUrl = `https://${url.replace(/^https?:\/\//, '')}`;
        request(httpsUrl, (error, response) => {
            if (!error && response.statusCode === 200) {
                resolve('Online (with SSL)');
            } else {
                request(url, (error, response) => {
                    if (!error && response.statusCode === 200) {
                        resolve('Online (without SSL)');
                    } else {
                        resolve('Offline');
                    }
                });
            }
        });
    });
}

module.exports = { URL, checkURLStatus };
