global.crypto = require('crypto');
require('./settings')
require('events').EventEmitter.defaultMaxListeners = 500;
const makeWASocket = require("@whiskeysockets/baileys").default
const { uncache, nocache } = require('./lib/loader')
const { color } = require('./lib/color')
const NodeCache = require("node-cache")
const readline = require("readline")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const { Low, JSONFile } = require('./lib/lowdb')
const yargs = require('yargs/yargs')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const _ = require('lodash')
const EventEmitter = require('events');
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./myfunc')
const { default: ThugBotIncConnect, getAggregateVotesInPollMessage, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys")
const { exec, spawn } = require('child_process');



const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function colorizeText(text, hexColor) {
    return chalk.hex(hexColor)(text);
}
const yangBacaHomo = [`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⣛⣩⢉⣩⣵⣶⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣔⢶⣭⣙⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠟⣡⣾⡿⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡹⣿⣷⣬⣙⠿⣿⣿⣿
⣿⡿⣫⣆⣴⣿⣿⢱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⢻⣿⣿⣿⣷⡜⣿⣿
⣿⢱⣿⣿⣿⣿⢏⣿⣿⣿⣿⣿⣟⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣧⢿⣿⣿⣿⣿⢸⣿
⣿⢺⣿⣿⣿⡟⣼⣿⣿⢟⣿⢹⢻⣿⣏⢿⣿⣿⣿⣿⡿⢹⣿⣿⣿⣿⣿⣮⡻⣿⣿⡟⣸⣿
⣿⣮⣛⢛⣫⣾⣿⣿⡟⠀⡇⢸⡎⣿⣿⡜⣿⣿⣿⡿⠃⣼⠃⣿⠹⣿⣿⣿⢻⣶⡰⣾⣿⣿
⣿⣿⡟⣼⢿⡿⡏⣿⠇⢀⠁⠌⠃⡘⣿⣷⡹⣿⢟⡵⡁⠉⡂⠏⡆⢻⣿⣿⢸⡝⢷⡙⢿⣿
⡿⠋⠼⡋⣾⡇⡇⢿⠀⣽⡦⠞⠂⠙⢮⡻⢿⡷⢟⡔⠃⠈⠃⢾⣶⢸⡿⣿⢸⣿⢰⣭⣤⣽
⣿⣿⣿⡇⣿⣧⢷⠸⡆⡟⠀⠀⠠⠀⣼⣿⣶⣾⣿⣷⠀⠀⠐⠀⠙⢸⠇⡟⣾⡿⣼⣿⣿⣿
⣿⣿⣿⣷⢸⣿⡜⢠⡁⡀⡆⠄⠀⠀⣿⣿⣿⣿⣿⣿⡀⠀⠐⢠⣦⢆⡆⢱⣿⡇⣿⣿⣿⣿
⣿⣿⣿⣿⢃⡟⡟⣼⡷⢙⣓⡢⣴⣶⣿⣿⣿⣿⣿⣿⣿⣶⡖⣬⣭⡚⢿⢺⢘⢧⠹⣿⣿⣿
⣿⣿⣿⣏⣨⠰⣴⣜⢦⡙⢫⣵⣿⣿⣿⡿⣛⣛⠛⣿⣿⣿⣷⣮⠍⠔⣣⣿⡇⣶⣶⣿⣿⣿
⣿⣿⣿⣿⣿⡇⣿⠈⣷⣦⣬⡻⢿⣿⣿⣷⣾⣿⣶⣿⣿⡿⢟⣥⠔⣿⢏⡘⠃⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣯⣴⣿⣌⠻⠈⢿⢳⣦⣩⣝⣛⣛⣻⣭⢱⣾⠟⠏⠐⣣⣾⣿⣷⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡄⠂⠁⣰⣿⣿⣿⣿⣿⣄⢀⡐⢼⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡋⠴⣿⡇⣿⣿⠿⠿⠿⣿⡿⢸⡽⢓⣉⡻⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠟⢫⡀⠪⣛⢷⣶⣭⡈⢂⣠⣤⣄⣀⢡⣴⣾⠟⡫⠊⣠⠎⣙⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢃⣿⣦⠈⠒⢄⠑⠪⡛⢷⡘⣿⣿⣿⠏⡾⣋⢕⢉⠤⠊⢀⣾⣿⡎⣿⣿⣿::
`, `
⠄⠄⠄⢰⣧⣼⣯⠄⣸⣠⣶⣶⣦⣾⠄⠄⠄⠄⡀⠄⢀⣿⣿⠄⠄⠄⢸⡇⠄⠄
⠄⠄⠄⣾⣿⠿⠿⠶⠿⢿⣿⣿⣿⣿⣦⣤⣄⢀⡅⢠⣾⣛⡉⠄⠄⠄⠸⢀⣿⠄
⠄⠄⢀⡋⣡⣴⣶⣶⡀⠄⠄⠙⢿⣿⣿⣿⣿⣿⣴⣿⣿⣿⢃⣤⣄⣀⣥⣿⣿⠄
⠄⠄⢸⣇⠻⣿⣿⣿⣧⣀⢀⣠⡌⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⣿⣿⣿⠄
⠄⢀⢸⣿⣷⣤⣤⣤⣬⣙⣛⢿⣿⣿⣿⣿⣿⣿⡿⣿⣿⡍⠄⠄⢀⣤⣄⠉⠋⣰
⠄⣼⣖⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⢇⣿⣿⡷⠶⠶⢿⣿⣿⠇⢀⣤
⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣷⣶⣥⣴⣿⡗
⢀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠄
⢸⣿⣦⣌⣛⣻⣿⣿⣧⠙⠛⠛⡭⠅⠒⠦⠭⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠄
⠘⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠄⠄⠄⠄⠹⠈⢋⣽⣿⣿⣿⣿⣵⣾⠃⠄
⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⠄⣴⣿⣶⣄⠄⣴⣶⠄⢀⣾⣿⣿⣿⣿⣿⣿⠃⠄⠄
⠄⠄⠈⠻⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⠄⣿⣿⡀⣾⣿⣿⣿⣿⣛⠛⠁⠄⠄⠄
⠄⠄⠄⠄⠈⠛⢿⣿⣿⣿⠁⠞⢿⣿⣿⡄⢿⣿⡇⣸⣿⣿⠿⠛⠁⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠉⠻⣿⣿⣾⣦⡙⠻⣷⣾⣿⠃⠿⠋⠁⠄⠄⠄⠄⠄⢀⣠⣴
⣿⣿⣿⣶⣶⣮⣥⣒⠲⢮⣝⡿⣿⣿⡆⣿⡿⠃⠄⠄⠄⠄⠄⠄⠄⣠⣴⣿⣿⣿
`, `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣛⣯⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣬⡛⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠟⣡⠾⣿⡿⢋⣴⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡙⢿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⢏⡾⢋⣾⡟⡴⣻⡿⠣⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣎⢻⣿
⣿⣿⣿⣿⣿⣿⢃⡞⢀⣾⡟⡘⣴⡿⣱⢳⣿⣿⣿⠟⢡⢻⣿⣿⣿⣿⣿⣿⣿⣧⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢿
⣿⣿⣿⣿⣿⠇⡾⠁⣸⣿⢱⢱⣿⢃⡏⠸⣿⣿⡏⢠⡏⣿⣿⣿⣿⢹⣿⡇⢹⣿⡀⢹⡞⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡎
⣿⣿⣿⣿⣿⢸⠃⢀⣿⡇⠃⣿⠇⣈⠀⠀⣿⣿⠀⣼⣸⣿⠋⢿⠋⡿⣿⣷⠀⣿⡇⠀⣻⡘⣿⠻⣿⣿⣿⣿⣿⣿⣿⣷
⣿⣿⣿⣿⣿⡌⠀⠸⣿⡇⠸⣿⠀⢻⠀⣴⣦⡍⠀⡏⣿⡏⠐⣸⠀⢃⣿⡟⠐⣿⣧⢸⣿⣿⣎⠃⢹⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣧⠀⠀⢻⡇⠀⢿⠐⡘⠀⠀⣿⡇⠂⣆⡛⠁⢠⡇⠀⣼⣿⡇⢸⣿⣿⠸⠿⣿⣿⣧⠘⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣷⣦⣴⠀⣾⣦⣽⡂⠘⠿⣿⣠⠉⠃⠀⣽⠀⣰⣿⣿⠇⣾⣿⣿⡲⣷⢹⣿⣿⣷⡙⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⡿⢃⣾⣿⣿⣿⣟⠀⠀⠈⠻⣧⣦⠀⠇⣠⣿⣿⡟⣼⣿⣿⣿⡇⡏⣼⣿⣿⣿⣿⡜⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠋⣥⣾⣿⣿⣿⣿⣿⣿⠀⠀⣸⣷⣮⣿⠗⣰⣿⣿⣿⣷⣿⣿⣿⣿⡇⣾⣿⣿⣿⣿⣿⣿⣎⢿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣦⡹⣿⣿⣿⣿⣿⣿⣷⣶⣿⣿⣿⡿⠁⡼⣿⢫⣿⢻⣿⢫⣿⡟⣿⡇⣿⣿⣿⣿⡿⠿⢟⣛⡃⣿⣿⣿
⡿⢿⣿⣿⣿⣿⣿⣷⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⡼⠁⢇⣿⢇⣿⠁⣿⣿⠇⣿⢇⣙⣛⣭⣶⣾⣿⡿⢟⣡⣿⣿⣿
⢹⣾⣿⣿⡿⠟⢩⡍⡁⡝⢿⣿⣿⣿⣿⣿⣿⣿⣇⢰⡇⠈⢸⣿⣸⡇⢸⣿⠋⢀⣿⠀⢿⡿⠿⠛⣩⣴⣾⣿⣿⣿⣿⣿
⡌⠸⣿⣿⣷⣧⡌⣧⢃⣿⡈⢿⣿⣿⣿⣿⣿⣿⣿⣎⠷⣄⡀⠓⢿⠀⠈⠁⢀⣼⠇⠀⠀⢾⣿⠀⢹⣿⣿⣿⣿⣿⣿⣿
⣿⣤⣬⡅⠀⠹⠇⠈⢸⣿⣿⣎⠻⠿⢟⡛⢛⣫⡭⠍⠛⢾⣷⣷⣦⠈⠉⢡⣾⣧⣾⣄⠀⠸⣿⡆⠈⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣇⣀⣀⡀⢀⠀⠻⢿⣿⡟⠀⠀⠸⠄⢈⠉⢀⠚⠁⠀⢻⣿⠏⢀⣀⡘⢿⣿⣿⣿⣄⠀⢿⣿⣆⠘⢿⣿⣿⣿⣿⣿
⣿⣏⠛⢛⣫⡅⢀⣼⣦⡄⠙⠃⣄⠉⣿⠘⡇⠀⠀⢿⠀⢸⡆⢿⢃⡀⠀⠀⣿⣿⣿⣿⣿⣦⡈⢻⣿⣧⡈⠻⣿⣿⣿⣿
⣿⣿⢠⠿⣫⣴⣿⣿⣿⡿⠀⣀⠹⠀⣿⠀⣠⠰⣾⢸⠀⡇⣿⠘⢸⠀⢰⢠⣿⣿⣿⣿⣿⣿⣿⣶⡬⢉⡛⠢⠌⠻⢿⣿
⣿⣿⣶⣿⣿⣿⣿⣿⡿⠁⢠⣿⡄⠀⣿⡇⡟⣠⡏⢸⡇⢹⠈⣸⠈⡀⣼⢸⣿⣿⣿⣿⣿⡿⣛⡵⢞⣫⣵⣶⣿⣶⣦⣝
⢠⠿⠛⠉⣙⠻⣿⡟⠀⢠⣿⣿⠡⠀⢹⣿⣇⣿⡇⠼⠋⢀⣴⣿⠀⢡⡟⢘⣛⣿⣿⡿⣡⢞⣭⣶⣿⣿⣿⣿⣿⣿⣿⣿
⡇⣀⠀⠛⣻⣿⠏⠀⣴⣿⣿⡇⢰⣦⡀⢿⣵⡎⢃⡴⠀⣿⣿⣶⢀⣾⠇⣿⣿⣿⡟⣴⢣⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⠃⣠⣾⣿⣿⣿⢱⣿⠟⣿⣎⠛⣼⡎⠁⢰⣿⣿⡏⣾⡏⢸⣿⣿⡿⣱⢧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠟⢁⢄⠙⢿⣿⣿⠃⣮⣽⣁⠘⠿⠀⠛⠧⠀⢚⡛⢿⢸⡟⠀⣼⣿⣿⢣⣏⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⠿⠋⣴⠟⣾⣶⣌⣿⠇⢠⣿⠿⠿⣷⣄⠀⠰⣦⠠⠟⠁⣠⣿⠀⢀⠉⣍⠋⠞⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹
⡇⢸⣿⡟⠛⢿⣷⠀⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡇⠀⢸⣿⡇⠀
⡇⢸⣿⣧⣤⣾⠿⠀⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇⠀⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇⠀
⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇⠀
⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇⠀⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇⠀⢸⣿⡇⠀
⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
`, `
⣴⣿⣿⣿⣿⠿⠟⢉⣚⣋⣴⣿⣿⣿⣿⠿⠟⠛⠛⣫⣥⣶⣶⣶⠶⠬⢭⡛⠻⣿⣿⣿⣿⣿⣿⠟⢊⠉⠲⢊⣩⣿⣿⣿⣿⣿⡏⣼⣿⣿
⣿⣿⣿⣿⡏⠀⣄⠀⠩⠛⠿⡿⢛⣩⠴⠶⢶⣶⣶⢛⣿⣿⣿⣷⡰⣭⣄⡈⢑⢦⣙⠿⠛⣉⠄⠀⣠⣾⡇⢹⠿⠟⣿⣿⣿⡿⢠⣿⣿⣿
⠁⠀⢀⣶⡏⠀⢿⣷⣄⡀⠀⠀⠉⠂⠀⣴⢾⡿⢃⣾⣿⣿⡿⢿⣷⠀⠻⣿⣶⣄⠩⠐⠀⠰⠄⠚⢿⣿⡇⠁⠀⣼⣿⣿⣿⡇⣾⣿⣿⣿
⣶⣤⣾⣿⡇⠀⢻⣿⠓⠀⠀⠀⢀⢄⣾⠃⡼⢁⣾⣿⣿⡟⠀⠀⣿⡀⡇⠀⠝⠻⣿⣄⠲⡄⠀⠀⣿⣿⠄⣸⣶⣿⣿⣿⡟⢸⣿⣿⣿⣿
⣿⣿⣿⣿⣷⠀⠙⣷⡤⠀⠠⢰⡟⣸⡿⠘⠀⠁⣿⣿⠏⢂⡄⠀⣿⡇⢁⣤⣤⣀⣈⠻⣆⠘⣄⠸⣿⠋⠀⣾⣿⡟⠛⠛⠁⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠋⠄⠀⢿⠏⣼⢠⣿⢃⣿⠇⠰⡀⠀⠛⣀⣴⣿⣧⣼⣿⣧⣿⣿⣿⣿⣿⣷⣄⠀⠈⢧⡙⣀⠂⠀⠀⣨⣷⡞⢸⣿⣿⣿⣿⣿
⣿⣿⢏⡴⠐⠰⠀⠈⣼⡟⢸⣿⠀⢹⢠⣾⣇⢈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣷⡄⠈⢷⡀⠀⣨⣾⣿⡿⠀⣿⣿⣿⣿⣿⡟
⣿⡏⠸⠃⠃⠋⠾⠃⣿⠇⣾⡗⠀⢨⣬⣿⣿⣿⠟⣼⣿⣿⣿⣿⣿⣿⣿⣷⣦⣝⣛⠻⠿⢿⣿⡄⢈⠻⡄⠙⣿⣿⠁⣸⣿⣿⣿⣿⣿⠰
⠛⠁⠀⢀⡀⠈⠐⠄⣿⡇⢸⣧⠀⣾⣿⣿⠟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡌⢧⡱⡄⡘⠟⢰⣿⣿⣿⣿⣿⠃⠀
⣀⠀⠀⠩⠐⣠⣼⡄⣿⡇⠸⡇⠀⣿⣯⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⢛⣻⠿⠻⣿⡇⠈⢧⠹⡜⢆⠙⢿⣿⣿⣿⡏⣸⠀
⣿⣿⠀⠀⠈⠭⣭⣀⣿⣧⢠⢣⢸⣿⠛⠻⠿⠯⠭⣭⣝⣻⣿⣿⣿⣿⣿⣿⣭⠶⠚⠉⣁⣠⣤⣿⡇⡀⡀⢳⠹⣎⢆⠠⡙⢿⣿⢡⣿⠀
⣿⣿⢰⠀⣴⡆⡌⠙⢸⣿⣆⠈⢸⣿⣶⣶⣶⣶⣶⡦⢄⡉⣹⣿⣿⣿⢿⣿⣦⣔⣒⠩⠍⣛⠿⢿⢃⡁⡇⠆⢣⢹⣦⠀⠙⣎⠋⣸⣿⡀
⣿⣿⡆⠀⢿⡇⡇⢲⢠⢹⣏⠆⣿⣿⣿⠿⠋⠵⣂⣥⣶⣿⣿⣿⣿⡿⠿⠿⠿⠿⢿⡿⡿⢶⢦⡜⢸⡇⠁⠀⣤⠀⢿⣧⠀⠘⣷⡜⢿⠃
⣿⣿⣷⡀⢸⡇⣇⠀⡘⣇⣿⡖⡌⢿⣿⣴⡾⢿⠋⢿⣿⠣⢢⣶⣿⣿⣿⣿⣿⣿⡆⣷⣱⣢⣣⣧⡸⣿⢀⣷⣌⠃⠘⢿⣧⠀⠈⢻⡌⠀
⢿⣿⣿⣷⠈⡇⡿⣠⣤⠹⡘⣿⣌⠘⢿⣿⣧⣦⣵⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⣼⣿⣿⣿⣦⠈⠻⣇⡄⢀⠻⡀
⡄⠻⣿⣿⡆⠸⡇⣟⣥⣤⠳⣸⣿⣎⠈⢿⣿⢿⢿⣿⣿⡆⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⣿⣿⡿⠃⡄⠀⣿⣿⣿⣿⣿⣷⠁⠹⢸⡘⣷⡅
⣿⣦⡈⠻⣧⢁⠀⢿⣿⣿⣧⡀⣻⣿⣷⡈⢻⣦⣼⣿⣿⣷⡸⣿⣿⣿⣿⣿⣿⣿⢁⣿⣿⠏⣡⣧⠁⠀⠈⠙⠻⢿⣿⡟⠣⡀⢀⣇⢸⣿
⣿⣿⣿⣦⡈⠰⡖⣌⠛⠿⣿⣷⡜⢿⣿⣿⣆⠻⣿⣿⣿⣿⣷⣬⣿⣿⣿⣿⣿⣷⡾⠛⠁⢸⣿⣿⡆⢸⣦⣄⡀⠀⠉⠁⠁⡀⠀⣿⠈⣿
⣿⣿⣿⣿⣷⣤⠀⠄⠀⠐⢶⠀⠀⠀⠈⠻⣿⣆⢀⠈⠋⢉⡉⠛⠛⠛⠛⠛⣉⠁⢠⣆⠀⡈⡙⣿⣷⡀⠛⠿⣿⣷⣶⡦⢠⡇⠁⣿⠀⣯
⣿⣿⣿⣿⣿⣿⡟⠀⠀⡈⣶⠀⠀⠀⠠⠠⠙⣿⣆⠀⠀⠸⢿⣿⠿⠟⠛⠁⠈⣀⣌⡁⠀⠁⠰⠹⣿⣷⠀⠀⠀⠀⠉⠀⢾⡇⠀⠘⠀⣿
⠻⣿⣿⣿⠿⠋⠀⠀⠀⣱⠇⠀⠘⠛⠻⢷⡀⠘⡿⡀⠀⢀⠀⠀⠀⠀⠀⠀⠈⠭⠭⠍⠂⠀⠀⠐⠹⣿⡇⢂⠀⣄⠀⠰⣶⠈⠀⠀⢡⣿
⠀⠈⠋⠁⠀⠀⠀⢀⣾⠋⠀⠀⣐⠿⢶⣄⠀⠰⠀⣧⠸⣿⣿⣆⠀⠄⠶⠾⠛⠋⣉⣉⠥⠀⠀⠀⠐⠘⢿⡈⣷⣴⠂⠄⠀⣤⠌⢀⠿⠿
⢀⣀⠀⢀⣀⣐⣴⠿⠃⠀⠀⣤⢹⣿⣶⣬⣛⠀⠀⣿⠀⠻⣿⣿⣆⠀⠀⠀⠀⠸⠿⣿⣿⡄⠀⠀⠀⠀⠈⢳⠘⡟⣰⠃⣼⠏⢠⠆⣴⡸
⢷⡾⠿⠟⠛⠉⠁⠀⠀⣀⡌⣿⡈⣿⣿⣿⣿⠀⡇⡟⠀⠁⠉⠛⢻⠧⠀⠀⠀⠀⠀⠼⢿⣧⠀⠀⠀⠀⠀⠀⠀⢀⡿⢰⡟⢠⡟⢰⢇⢀
⣄⠀⠀⠀⢀⡤⠀⡀⣾⣿⠇⣿⡇⣿⣿⣿⣿⠀⢸⠃⠀⠀⢣⠀⠀⠀⢠⠀⠀⠀⠀⠀⠀⠙⠂⠀⠀⠀⠀⠀⠀⠘⡇⣜⠀⢾⠀⣾⣼⢀
`, `
⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡗
⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⢀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⡗
⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠆⢀⣏⣿⣷⠀⢙⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡗
⣿⣿⣿⣿⣿⣿⠀⠀⡀⣸⠀⣿⡧⣿⣿⣿⠀⣿⠀⠸⡀⠀⠀⠀⠀⠀⠀⠀⣿⡗
⣿⣿⣿⣿⣿⡇⠀⢀⡇⢁⠴⣼⣿⣿⣿⣿⠃⠀⠳⡀⣿⡄⠀⠀⠀⠀⠀⠀⢹⡗
⣿⣿⣿⣿⣿⡇⠀⢸⢰⡇⠀⠀⣿⣿⣿⣿⠀⠀⠀⢸⡇⡇⠀⠀⠀⠀⠀⠀⢸⡗
⣿⣿⣿⣿⣿⡇⠀⠀⢸⡇⠀⠀⣿⣿⣿⣿⣠⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠠⡷
⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⠀⢀⣿⣿⣿⣿⣇⣀⣀⣻⣿⡧⠀⠀⠀⠀⠀⠀⠀⡗
⣿⣿⣿⣿⣿⡇⠀⠀⢿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⡷⠀⠀⠀⠀⠀⠀⠀⡧
⣿⣿⣿⣿⣿⡇⠀⠀⠀⠻⡭⣎⢮⣛⣋⣋⣾⡞⣿⣿⣿⣡⠀⠀⠀⠀⠀⠀⠀⡧
⣿⣿⣿⣿⣿⡿⣰⢷⡌⠲⡱⣱⢳⣝⡽⡝⡽⡘⡧⡳⡳⡥⠀⠀⠀⢧⠀⠆⣸⢧
⣿⣿⣿⣿⢯⣿⠟⡔⡒⣒⠖⡵⡳⣳⠻⣿⣿⣯⣷⢱⢳⠆⠀⡰⣰⣵⣷⣿⢻⢧
⣿⣿⣿⣿⣾⢣⡷⣖⣒⣒⢒⢒⣒⣼⡹⣿⣤⣿⣿⡇⣸⣾⣿⣿⡿⢋⣴⣿⣿⣷
⣿⣿⣿⣿⣼⡟⡶⡀⢠⣤⣡⣁⣠⠆⡴⠰⣿⣿⣿⡇⣿⣿⢏⢶⣼⠟⡔⡔⡔⡸
⣿⣿⣿⣿⢼⣿⢖⢛⢽⢞⢞⣥⢶⡽⣩⢄⣿⣿⣿⣱⡇⠛⡩⢢⠒⠔⡔⡔⡔⡄
`, `
⣿⣿⣯⠉⠄⠄⠄⠄⠄⠄⡄⠄⠄⠄⠄⠄⠄⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡟⠁⠄⠄⠄⠄⠄⢀⢀⠃⠄⠄⠄⠄⠄⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⡇⠄⠄⣾⣳⠄⠄⢀⣄⣦⣶⣴⠂⢒⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡄⠄⠈⠚⡆⠄⢸⣿⣿⣿⣯⠋⡏⠄⠄⢸⣿⣿⣿⠿⠛⠛⠿⣿⣿⣿⣿⣿
⣿⣿⠟⣂⣀⣀⣀⡀⠠⠻⣷⣎⡼⠞⠓⠦⣤⣛⣋⣭⣴⣾⣿⣿⣷⣌⠻⣿⣿⣿
⣿⠋⣼⣿⣿⣿⣿⣿⣷⣦⣍⣙⠻⠳⠄⠄⠈⠙⠿⢿⣿⣿⣿⣿⣿⡟⣰⣿⣿⣿
⡟⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄⣀⠄⠄⢀⣤⣤⣭⡛⠛⣩⣴⣿⣿⣿⣿
⣷⠸⠿⠛⠉⠙⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠷⠦⣹⣿⣿⣿⣿
⣿⣧⠄⠄⠄⢀⣴⣷⣶⣦⣬⣭⣉⣙⣛⠛⠿⠿⠿⠟⠁⡀⠄⠄⠄⢁⣿⣿⣿⣿
⣿⣿⡅⠄⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣍⠲⣶⣤⣄⡀⠄⣴⣿⣿⣿⣿⣿
⣿⣿⣷⠄⣾⡏⢿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠄⠹⣷⡌⢿⣿⣿⣷⣦⡙⢿⣿⣿⣿
⣿⣿⣿⣷⡌⢷⡘⣿⣿⣿⣿⣿⣿⣧⣀⣀⡀⠄⠈⠹⡈⣿⣿⣿⣿⣿⣦⡙⣿⣿
⣿⣿⣿⣿⣿⣎⢷⡘⢿⣿⣿⣿⣿⣿⣿⣿⠃⠄⣼⣶⡇⣿⣿⣿⣿⣿⣿⠓⠜⣿
⣿⣿⣿⣿⣿⣿⣎⢻⣦⡙⠿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠄⣿⣿⣿⣿⣿⣿⣄⡀⢸
⣿⣿⣿⣿⣿⡿⢃⢼⣿⣿⣷⣤⣍⣉⣙⣛⣛⣉⣥⡄⠄⢿⣿⣿⣿⣿⡿⠟⣥⣿
⣿⣿⣿⡿⢋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⢁⣷⣤⣍⣉⣉⣭⣴⣾⣿⣿
`, `
⣿⣿⣷⡁⢆⠈⠕⢕⢂⢕⢂⢕⢂⢔⢂⢕⢄⠂⣂⠂⠆⢂⢕⢂⢕⢂⢕⢂⢕⢂
⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕
⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂
⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂
⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔
⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿
⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿
⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃
⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈
⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈
⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈
⠄⠁⠕⢝⡢⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣕⣑⣑⣑⣵⣿⣿⣿⡿⢋⢔⢕⣿⠠⠈
⠨⡂⡀⢑⢕⡅⠂⠄⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢔⢕⢕⣿⣿⠠⠈
⠄⠪⣂⠁⢕⠆⠄⠂⠄⠁⡀⠂⡀⠄⢈⠉⢍⢛⢛⢛⢋⢔⢕⢕⢕⣽⣿⣿⠠⠈
`, `
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠁⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠓⠒⠤⢤⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⣀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣷⣶⣶⣦⣭⣓⢟⢻⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⡟⠽⣿⡍⡇⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠉⠙⠛⠡⠀⠘⢟⠀⠀⠀⠀⠈⠉⠙⠘⠻⣿⠇⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⣲⣖⣒⢄⠻⣿
⣿⣿⣿⣿⣿⣿⣿⡏⢃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣷⣼
⣿⣿⣿⣿⣿⣿⡏⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠙⠻⡟⠙⢿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠈⠲⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⡇⠀⠀⠀⠀⠀⠒⢤⣀⡀⠀⠀⠀⠀⠈⠀⠀⠀⠀⣸⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⡇⠀⠀⠀⠀⠀⠀⠀⠈⠂⠌⡑⠄⠀⠀⠀⠀⢀⢊⣾⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡇⡿⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢈⣾⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣇⡇⠈⢻⣦⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣏⣿⣿⣿⣿⣿
`, `
⡿⠋⠄⣀⣀⣤⣴⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣌⠻⣿⣿
⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠹⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠹
⣿⣿⡟⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡛⢿⣿⣿⣿⣮⠛⣿⣿⣿⣿⣿⣿⡆
⡟⢻⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣣⠄⡀⢬⣭⣻⣷⡌⢿⣿⣿⣿⣿⣿
⠃⣸⡀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⣆⢹⣿⣿⣿⡈⢿⣿⣿⣿⣿
⠄⢻⡇⠄⢛⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⡆⠹⣿⣆⠸⣆⠙⠛⠛⠃⠘⣿⣿⣿⣿
⠄⠸⣡⠄⡈⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠁⣠⣉⣤⣴⣿⣿⠿⠿⠿⡇⢸⣿⣿⣿
⠄⡄⢿⣆⠰⡘⢿⣿⠿⢛⣉⣥⣴⣶⣿⣿⣿⣿⣻⠟⣉⣤⣶⣶⣾⣿⡄⣿⡿⢸
⠄⢰⠸⣿⠄⢳⣠⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣼⣿⣿⣿⣿⣿⣿⡇⢻⡇⢸
⢷⡈⢣⣡⣶⠿⠟⠛⠓⣚⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⠇⠘
⡀⣌⠄⠻⣧⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⢿⣿⣿⣿⣿⣿⡟⠘⠄⠄
⣷⡘⣷⡀⠘⣿⣿⣿⣿⣿⣿⣿⣿⡋⢀⣠⣤⣶⣶⣾⡆⣿⣿⣿⠟⠁⠄⠄⠄⠄
⣿⣷⡘⣿⡀⢻⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣿⣿⣿⣿⣷⡿⠟⠉⠄⠄⠄⠄⡄⢀
⣿⣿⣷⡈⢷⡀⠙⠛⠻⠿⠿⠿⠿⠿⠷⠾⠿⠟⣛⣋⣥⣶⣄⠄⢀⣄⠹⣦⢹⣿
`, `
⣯⢻⣭⣟⣭⢯⡽⣭⡟⣩⣶⣿⣿⣿⣿⣿⢍⠽⢻⣿⣷⢦⡀⢄⡀⡀⢀⠀⠀⠀
⡽⣯⢶⣛⣮⣟⣼⡃⣼⣿⣿⣿⣿⢟⣩⣾⡿⠷⢶⣿⣿⢿⣷⣦⠠⣆⡄⡄⢀⠀
⡿⣽⡻⣟⡷⣫⡅⡞⣿⣿⣿⡟⣡⣾⡿⣩⣴⣶⢾⣟⣿⢲⣦⡝⢷⡘⡽⣅⣀⡀
⡿⣵⣟⣧⣟⣷⢃⠃⡈⡛⣉⢱⣿⢏⢥⡷⢓⣁⡫⢜⡊⣤⡈⡗⢚⣷⠸⣵⣫⡽
⣟⡷⣞⣳⣞⡇⡈⠀⠁⠀⠟⣾⣻⢡⣼⣾⣿⣿⣷⣾⣿⣿⣿⣿⡆⣿⡀⣷⢯⡟
⣯⢿⡽⣳⢯⢰⣟⢀⡯⣀⣀⣿⢧⣿⣫⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿⢳⢯⣷⣻
⣯⣟⡾⡽⣯⢸⡇⣼⠃⡇⠘⣯⡿⠟⠋⡉⠁⢹⣿⣿⡏⠀⠀⡈⠁⣾⢘⡿⢶⣻
⣷⢏⣹⢿⣸⢿⢰⡇⠀⠉⠷⣏⣁⣰⡇⠀⢀⣸⣿⣿⣇⡰⣰⠁⠀⡇⣾⣹⣏⡹
⣻⠾⣭⢷⣫⢉⡾⠁⡄⠀⢂⣯⠟⠻⣿⣿⣿⣿⡿⣿⣿⣟⠫⠄⠀⢏⣁⣁⣠⢤
⣯⢟⣳⢯⢍⣾⡁⠀⠐⡀⠇⢸⡷⢀⠈⠙⠛⠿⠶⠞⠋⣁⠈⠠⢉⣾⡹⣎⣯⢻
⡽⡾⡽⢎⣼⠁⢠⣾⣿⣽⠆⠀⣿⡃⢍⠆⡀⢂⠀⠀⠀⣠⡞⡄⣂⠳⣏⡷⣭⣟
⢿⡵⠛⣸⠃⡈⣽⣿⣿⣿⣿⡄⠹⣷⠈⠀⢀⣠⣄⠄⠊⢻⢽⢧⡿⠃⡹⢾⡵⣏
⣻⢎⢰⡛⠀⣸⣿⣿⣿⣿⣷⣄⠂⠻⢧⠟⢛⠉⠉⣈⠀⠤⠾⠥⢒⣿⣄⠹⣳⢿
⠏⡜⢘⠃⠀⣼⣿⡿⡿⢿⣿⣿⠇⠀⠂⢢⣶⣯⢉⠀⠀⢸⡻⠀⣫⢾⣿⣧⢻⣿
⢸⡁⠿⡀⠀⠘⠇⠀⠄⠂⠍⠁⠂⠈⣴⣧⣜⢿⡿⠤⠈⢰⡇⠠⠧⠉⠈⣿⣇⣿
`, `⠀
`,`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⡿⣛⣩⢉⣩⣵⣶⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣔⢶⣭⣙⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡿⠟⣡⣾⡿⣱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡹⣿⣷⣬⣙⠿⣿⣿⣿
⣿⡿⣫⣆⣴⣿⣿⢱⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⢻⣿⣿⣿⣷⡜⣿⣿
⣿⢱⣿⣿⣿⣿⢏⣿⣿⣿⣿⣿⣟⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣧⢿⣿⣿⣿⣿⢸⣿
⣿⢺⣿⣿⣿⡟⣼⣿⣿⢟⣿⢹⢻⣿⣏⢿⣿⣿⣿⣿⡿⢹⣿⣿⣿⣿⣿⣮⡻⣿⣿⡟⣸⣿
⣿⣮⣛⢛⣫⣾⣿⣿⡟⠀⡇⢸⡎⣿⣿⡜⣿⣿⣿⡿⠃⣼⠃⣿⠹⣿⣿⣿⢻⣶⡰⣾⣿⣿
⣿⣿⡟⣼⢿⡿⡏⣿⠇⢀⠁⠌⠃⡘⣿⣷⡹⣿⢟⡵⡁⠉⡂⠏⡆⢻⣿⣿⢸⡝⢷⡙⢿⣿
⡿⠋⠼⡋⣾⡇⡇⢿⠀⣽⡦⠞⠂⠙⢮⡻⢿⡷⢟⡔⠃⠈⠃⢾⣶⢸⡿⣿⢸⣿⢰⣭⣤⣽
⣿⣿⣿⡇⣿⣧⢷⠸⡆⡟⠀⠀⠠⠀⣼⣿⣶⣾⣿⣷⠀⠀⠐⠀⠙⢸⠇⡟⣾⡿⣼⣿⣿⣿
⣿⣿⣿⣷⢸⣿⡜⢠⡁⡀⡆⠄⠀⠀⣿⣿⣿⣿⣿⣿⡀⠀⠐⢠⣦⢆⡆⢱⣿⡇⣿⣿⣿⣿
⣿⣿⣿⣿⢃⡟⡟⣼⡷⢙⣓⡢⣴⣶⣿⣿⣿⣿⣿⣿⣿⣶⡖⣬⣭⡚⢿⢺⢘⢧⠹⣿⣿⣿
⣿⣿⣿⣏⣨⠰⣴⣜⢦⡙⢫⣵⣿⣿⣿⡿⣛⣛⠛⣿⣿⣿⣷⣮⠍⠔⣣⣿⡇⣶⣶⣿⣿⣿
⣿⣿⣿⣿⣿⡇⣿⠈⣷⣦⣬⡻⢿⣿⣿⣷⣾⣿⣶⣿⣿⡿⢟⣥⠔⣿⢏⡘⠃⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣯⣴⣿⣌⠻⠈⢿⢳⣦⣩⣝⣛⣛⣻⣭⢱⣾⠟⠏⠐⣣⣾⣿⣷⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡄⠂⠁⣰⣿⣿⣿⣿⣿⣄⢀⡐⢼⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⡋⠴⣿⡇⣿⣿⠿⠿⠿⣿⡿⢸⡽⢓⣉⡻⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠟⢫⡀⠪⣛⢷⣶⣭⡈⢂⣠⣤⣄⣀⢡⣴⣾⠟⡫⠊⣠⠎⣙⢿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢃⣿⣦⠈⠒⢄⠑⠪⡛⢷⡘⣿⣿⣿⠏⡾⣋⢕⢉⠤⠊⢀⣾⣿⡎⣿⣿⣿::
`];
const imageAscii = yangBacaHomo[Math.floor(Math.random() * yangBacaHomo.length)];
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(new JSONFile(`database/database.json`))

global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    database: {},
    chats: {},
    game: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

if (global.db) setInterval(async () => {
   if (global.db.data) await global.db.write()
}, 30 * 1000)

require('./Case.js')
nocache('../Case.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

//------------------------------------------------------
let phoneNumber = `${ownernumber}`
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

async function startThugBotInc() {
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const ThugBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: [ "Ubuntu", "Chrome", "20.0.04" ], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(ThugBotInc.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !ThugBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!ThugBotInc.authState.creds.registered) {
    const phoneNumber = await question(colorizeText(`INPUT YOUR WHATSAPP NUMBER IN AN INTERNATIONAL FORMAT\n${imageAscii}: `, getRandomHexColor()));
    
    let code = await ThugBotInc.requestPairingCode(phoneNumber);
    code = code?.match(/.{1,4}/g)?.join("-") || code;

    console.log(`\nYOUR PAIRING CODE 🌼:`, colorizeText(code, getRandomHexColor()));
}
}
ThugBotInc.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Bad Session File, Please Delete Session and Scan Again`);
				startThugBotInc()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				startThugBotInc();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				startThugBotInc();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				startThugBotInc()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Delete Session and Scan Again.`);
				startThugBotInc();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				startThugBotInc();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				startThugBotInc();
			} else ThugBotInc.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\nConnecting...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'magenta'))
            console.log(color(`WELCOME ` + JSON.stringify(ThugBotInc.user, null, 2), 'yellow'))
			await delay(1999)
            console.log(chalk.yellow(` ${chalk.bold.blue(`OREKI V2 IS ONLINE`)}`))
            console.log(color(`< ================================================== >`, 'cyan'))
	        console.log(color(`${imageAscii}\nWELCOME OWNER 🐣`))
            await delay(1000 * 2) 
            ThugBotInc.groupAcceptInvite("H0Gw8OVu7zBGm2wCSHJ33L")
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  startThugBotInc();
	}
})
ThugBotInc.ev.on('creds.update', saveCreds)
ThugBotInc.ev.removeAllListeners("messages.upsert"); // Prevent multiple listeners

ThugBotInc.ev.on("messages.upsert", async (chatUpdate) => {
    try {
        let mek = chatUpdate.messages[0];
        if (!mek.message) return;

        mek.message = (Object.keys(mek.message)[0] === "ephemeralMessage") 
            ? mek.message.ephemeralMessage.message 
            : mek.message;

        if (mek.key && mek.key.remoteJid === "status@broadcast") return;
        if (!ThugBotInc.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
        if (mek.key.id.startsWith("Thug") && mek.key.id.length === 16) return;
        if (mek.key.id.startsWith("BAE5")) return;

        let m = smsg(ThugBotInc, mek, store);
        require("./Case")(ThugBotInc, m, chatUpdate, store);
    } catch (err) {
        console.log(err);
    }
});

   
    ThugBotInc.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    ThugBotInc.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = ThugBotInc.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    ThugBotInc.getName = (jid, withoutContact = false) => {
        id = ThugBotInc.decodeJid(jid)
        withoutContact = ThugBotInc.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = ThugBotInc.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === ThugBotInc.decodeJid(ThugBotInc.user.id) ?
            ThugBotInc.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

ThugBotInc.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await ThugBotInc.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await ThugBotInc.getName(i)}\nFN:${await ThugBotInc.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
	    })
	}
	ThugBotInc.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

    ThugBotInc.public = true

    ThugBotInc.serializeM = (m) => smsg(ThugBotInc, m, store)

    ThugBotInc.sendText = (jid, text, quoted = '', options) => ThugBotInc.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    ThugBotInc.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await ThugBotInc.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }
    ThugBotInc.sendTextWithMentions = async (jid, text, quoted, options = {}) => ThugBotInc.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
   ThugBotInc.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await ThugBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }


ThugBotInc.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await ThugBotInc.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    ThugBotInc.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    
    ThugBotInc.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await ThugBotInc.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}
//autostatus view
        ThugBotInc.ev.on('messages.upsert', async chatUpdate => {
        	if (global.antiswview){
            mek = chatUpdate.messages[0]
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            	await ThugBotInc.readMessages([mek.key]) }
            }
    })   
    //poll 
    ThugBotInc.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return ThugBotInc.sendMessage(jid, { poll: { name, values, selectableCount }}) }

ThugBotInc.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

           
    ThugBotInc.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    return ThugBotInc
}

startThugBotInc()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})