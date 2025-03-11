const path = require('path');
const Debug = require('debug')('app:start'); // Initialize Debug
const bot = require(path.join(__dirname, 'lib/amd'));
const { VERSION } = require(path.join(__dirname, 'settings'));

const start = async () => {
    Debug(`Starting Asta ${VERSION}`);
    try {
        await bot.init();
        // bot.logger.info('⏳ Database syncing!');
        await bot.DATABASE.sync();
        await bot.connect();
    } catch (error) {
        Debug('Error starting application:', error);

        // Optional: Retry after 5 seconds to prevent infinite loops
        setTimeout(start, 5000);
    }
};

start();