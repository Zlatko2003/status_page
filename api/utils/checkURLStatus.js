const request = require('request');

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

module.exports = { checkURLStatus };
