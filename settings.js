require('dotenv').config(); // Load environment variables from .env
const fs = require('fs');

global.location = process.env.LOCATION || "Africa,Nigeria,Delta state"; // Location
global.socialm = process.env.SOCIALM || "IG:";
global.ytname = process.env.YTNAME || "YT: THUGN1F1CENT";
global.botname = process.env.BOTNAME || 'ᎧᏒᏋᏦᎥ Ꮙ2'; // DON'T CHANGE 
global.tg = process.env.TG || "t.me/Hughie_H";
global.ownernumber = process.env.OWNERNUMBER || '2347079059033'; // Owner number
global.antiBugEnabled = process.env.ANTIBUG === "true"; // Convert to boolean
global.ownername = process.env.OWNERNAME || '꧁𝕿𝖍𝖚𝖌𝖓𝖎𝖋𝖎𝖈𝖊𝖓𝖙꧂X⌣X 🐥'; // Owner name
global.themeemoji = process.env.THEMEEMOJI || '🧸';
global.wm = process.env.WM || "꧁𝕿𝖍𝖚𝖌𝖓𝖎𝖋𝖎𝖈𝖊𝖓𝖙꧂X⌣X 🐥";
global.botscript = process.env.BOTSCRIPT || 'https://github.com/TN0X9/OREKI_V2_BETA'; // Script link
global.packname = process.env.PACKNAME || "ᎧᏒᏋᏦᎥ Ꮙ2";
global.author = process.env.AUTHOR || "★⃝ꪶ‎ ꪻꫝꪊᧁ🦄⃤🌹⃝⃘̉̉̉̉̉̉";
global.creator = process.env.CREATOR || "2347079059033@s.whatsapp.net";

// Handler
global.prefix = process.env.PREFIX || '.';
global.premium = process.env.PREMIUM ? process.env.PREMIUM.split(',') : ["2347079059033"]; // Array of premium users
global.hituet = parseInt(process.env.HITUET) || 0;
global.autoblocknumber = process.env.AUTOBLOCKNUMBER || ''; // Set autoblock country code
global.antiforeignnumber = process.env.ANTIFOREIGNNUMBER || ''; // Set anti foreign number country code
global.welcome = process.env.WELCOME === "true";
global.anticall = process.env.ANTICALL === "true";
global.autoswview = process.env.AUTOSWVIEW === "true";
global.adminevent = process.env.ADMINEVENT === "true";
global.groupevent = process.env.GROUPEVENT === "true";

// Messages
global.mess = {
    limit: '*You have exhausted your limits!*',
    nsfw: '*Nsfw is disabled in current chat, tell admins to enable it*',
    done: '*Successful*',
    owner: '*Owner Only!*',
    botadmin: '*Bot must be an admin! 👀*',
    admin: '*Admins Only! 👀*',
    privates: '*Private Chats Only*',
    group: '*Group Chats Only!*',
    error: '*Error!*',
    success: '*© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙷𝚄𝙶  𝚃𝙴𝙲𝙷𝙸𝙴𝚂™ 🐣*'
};

global.apikey = process.env.APIKEY || '';
global.capikey = process.env.CAPIKEY || '';
global.domain = process.env.DOMAIN || 'https://';
global.eggsnya = process.env.EGGSNYA || '15';
global.plocation = process.env.PLOCATION || '1';

// Thumbnail
global.thumb = fs.readFileSync('./T-Media/Oreki6.jpg');

// Auto-reload config on file update
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update '${__filename}'`));
    delete require.cache[file];
    require(file);
});