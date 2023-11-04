const mongoose = require('mongoose');
const request = require('request');
const nodemailer = require('nodemailer');

const urlSchema = new mongoose.Schema({
    name: String,
    url: String,
    status: String,
});

const URL = mongoose.model('URL', urlSchema);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'projectsby2023@gmail.com',
        pass: 'lewywrvkwxzovdzh',
    },
});

async function sendEmailNotification(url) {
    const mailOptions = {
        from: 'it@projectsby.com',
        to: 'zlatkomarkovski+iltfntcd1vipjqpc4ugi@boards.trello.com',
        subject: `${url} is DOWN`,
        text: `${url} is DOWN. \nPlease check the website`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email notification sent:', info.response);
        }
    });
}

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
                        sendEmailNotification(url);
                    }
                });
            }
        });
    });
}

module.exports = {
    URL,
    checkURLStatus,
    sendEmailNotification
};