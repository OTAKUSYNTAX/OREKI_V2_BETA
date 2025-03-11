require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');
process.ev = process.env;
global.location = process.env.LOCATION || "Africa, Nigeria, Delta state";
global.socialm = process.env.SOCIALM || "IG:";
global.ytname = process.env.YTNAME || "YT: THUGN1F1CENT";
global.botname = process.env.BOT_NAME || "ᎧᏒᏋᏦᎥ Ꮙ2 ★⃝ꪶ‎🦄⃤𖥘✪͜͡➺"; // DON'T CHANGE
global.tg = process.env.TG || "t.me/Hughie_H";
global.ownernumber = process.env.OWNER_NUMBER || "2347079059033"; // Owner number
console.log("Loaded SESSION_ID:", process.env.SESSION_ID);
if (!process.env.SESSION_ID) {
    console.error("❌ SESSION_ID is missing! Check your .env file.");
}
global.ownername = process.env.OWNER_NAME || "꧁𝕿𝖍𝖚𝖌𝖓𝖎𝖋𝖎𝖈𝖊𝖓𝖙꧂X⌣X 🐥"; // Owner name
global.themeemoji = process.env.THEMEEMOJI || "🧸";
global.wm = process.env.WM || "★⃝ꪶ‎ꪻꫝꪊᧁ 🦄⃤𖥘✪͜͡➺";
global.botscript = process.env.BOTSCRIPT || "https://github.com/OTAKUSYNTAX/OREKI_V2_BETA"; // Script link
global.packname = process.env.PACK_NAME || "ᎧᏒᏋᏦᎥ Ꮙ2 ★⃝ꪶ‎🦄⃤𖥘✪͜͡➺";
global.author = process.env.AUTHOR || "★⃝ꪶ‎ꪻꫝꪊᧁ 🦄⃤𖥘✪͜͡➺";
global.creator = process.env.CREATOR || "2347079059033@s.whatsapp.net";

// Handler
global.prefix = process.env.PREFIX || ".";

// Premium Users (convert from string to array)
global.premium = process.env.PREMIUM ? process.env.PREMIUM.split(",") : ["2347079059033"];

// Bot Settings
global.hituet = Number(process.env.HITUET) || 0;
global.autoblocknumber = process.env.AUTOBLOCKNUMBER || ""; // Autoblock country code
global.antiforeignnumber = process.env.ANTIFOREIGNNUMBER || ""; // Anti-foreign number country code
global.welcome = process.env.WELCOME === "true"; // Convert env string to boolean
global.anticall = process.env.ANTICALL === "true";
global.autoswview = process.env.AUTOSWVIEW === "true";
global.adminevent = process.env.ADMINEVENT === "true";
global.groupevent = process.env.GROUPEVENT === "true";

// Messages (using environment variables)
global.mess = {
    limit: process.env.MESS_LIMIT || "*You have exhausted your limits!*",
    nsfw: process.env.MESS_NSFW || "*Nsfw is disabled in current chat, tell admins to enable it*",
    done: process.env.MESS_DONE || "*Successful*",
    owner: process.env.MESS_OWNER || "*Owner Only!*",
    botadmin: process.env.MESS_BOTADMIN || "*Bot must be an admin! 👀*",
    admin: process.env.MESS_ADMIN || "*Admins Only! 👀*",
    privates: process.env.MESS_PRIVATES || "*Private Chats Only*",
    group: process.env.MESS_GROUP || "*Group Chats Only!*",
    error: process.env.MESS_ERROR || "*Error!*",
    success: process.env.MESS_SUCCESS || "*© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚃𝙷𝚄𝙶  𝚃𝙴𝙲𝙷𝙸𝙴𝚂™ 🐣*",
};

// API Keys
global.apikey = process.env.APIKEY || "";
global.capikey = process.env.CAPIKEY || "";
global.domain = process.env.DOMAIN || "https://";
global.eggsnya = process.env.EGGSNYA || "15";
global.plocation = process.env.PLOCATION || "1";

// Thumbnail Image
global.thumb = fs.existsSync(process.env.THUMB_PATH || "./T-Media/Oreki6.jpg")
    ? fs.readFileSync(process.env.THUMB_PATH || "./T-Media/Oreki6.jpg")
    : null;

// Auto-reload settings file when changes are detected
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update '${__filename}'`));
    delete require.cache[file];
    require(file);
});