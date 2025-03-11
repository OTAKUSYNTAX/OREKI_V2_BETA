const fs = require("fs");
const path = require("path");
const Config = require(path.join(__dirname, "../settings.js"));
const Pino = require("pino");
const { Boom } = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./exif");
const {
  default: SuhailMDConnect,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  jidDecode,
} = require("@whiskeysockets/baileys");
const fetch = require("node-fetch");
const axios = require("axios");

// Global Variables
global.setCmdAlias = {};
global.AstroOfficial = false;
global.sqldb = false;
global.pg_pools = false;

// PostgreSQL Connection
const connectPG = async () => {
  try {
    const { Pool } = require("pg");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Use environment variable
      ssl: { rejectUnauthorized: false },
    });
    const client = await pool.connect();
    client.release();
    console.log("🌍 Connected to PostgreSQL.");
    return true;
  } catch (error) {
    console.error("Could not connect with PostgreSQL:", error);
    return false;
  }
};

// MongoDB Connection
const connectMongo = async () => {
  const mongoose = require("mongoose");
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // Use env variable
    console.log("🌍 Connected to MongoDB.");
    return true;
  } catch (error) {
    console.error("Could not connect with MongoDB:", error);
    return false;
  }
};

// Initialize Store
const store = makeInMemoryStore({
  logger: Pino({ level: "silent" }).child({ level: "silent" }),
});

try {
  const storePath = path.join(__dirname, "store.json");
  if (fs.existsSync(storePath)) {
    store.readFromFile(storePath);
  }
} catch (error) {
  console.error("CLIENT STORE ERROR:", error);
}

// Increase Event Listener Limit (Use With Caution)
require("events").EventEmitter.defaultMaxListeners = 100;

// Synchronize Database
async function syncDB() {
  let logoPath = path.join(__dirname, "..T-Media/Oreki.jpg");
  try {
    global.log0 =
      typeof THUMB_IMAGE === "string"
        ? await getBuffer(THUMB_IMAGE.split(",")[0])
        : fs.readFileSync(logoPath);
  } catch (error) {
    global.log0 = fs.readFileSync(logoPath);
  }

  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, "baileys")); // Ensure correct path

  let connection = SuhailMDConnect({
    logger: Pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["Windows", "Chrome", ""],
    fireInitQueries: true,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: false,
    auth: state,
    getMessage: async (message) => {
      return { conversation: "Asta-Md" };
    },
  });

  return connection;
}

// Start Database Sync
syncDB().catch(console.error);