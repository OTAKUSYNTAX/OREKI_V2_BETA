const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const settings = require('./settings.js'); // Import settings.js for session detection

const credsPath = path.join('creds.json');
// If stored session exists, use session-based login
if (fs.existsSync(credsPath)) {
    console.log(chalk.green("✅ Session file found! Using session ID login."));
    require('./main2.js'); // Load the session ID-based login
} 
// If no session file, check for SESSION_ID in settings.js
else if (settings.SESSION_ID) {
    console.log(chalk.yellow("⚠️ No stored session found. Trying SESSION_ID..."));
    require('./main2.js'); // Load the session ID-based login
} 
// If no SESSION_ID found, switch to QR pairing method
else {
    console.log(chalk.red("❌ No session ID found. Switching to pair code login."));
    require('./main1.js'); // Load the pair code-based login
}