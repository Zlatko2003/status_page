const request = require('request');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Zoho',
  auth: {
    user: 'it@projectsby.com', 
    pass: 'S&gkhjz3',
  },
});

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
            const mailOptions = {
              from: 'it@projectsby.com',
              to: 'zlatkomarkovski+iltfntcd1vipjqpc4ugi@boards.trello.com',
              subject: 'URL is Offline',
              text: `${url} is DOWN.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error sending email:', error);
              } else {
                console.log('Email notification sent:', info.response);
              }

              resolve('Offline');
            });
          }
        });
      }
    });
  });
}

module.exports = { checkURLStatus };
