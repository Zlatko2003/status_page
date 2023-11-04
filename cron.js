const cron = require('node-cron');
const { URL, checkURLStatus, sendEmailNotification } = require('./api/schemas/urlSchema');

cron.schedule('* * * * *', async () => {
  try {
    const urls = await URL.find();

    for (const urlData of urls) {
      const { name, url } = urlData;

      try {
        const status = await checkURLStatus(url);
        await URL.findByIdAndUpdate(urlData._id, { status });

        if (status !== 'Online (with SSL)' && status !== 'Online (without SSL)') {
          await sendEmailNotification(name, url);
        }
      } catch (error) {
        console.error(`Error checking URL status for ${url}: ${error}`);
      }
    }
  } catch (error) {
    console.error(`Error fetching URLs from the database: ${error}`);
  }
});
