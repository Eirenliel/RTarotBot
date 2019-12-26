const debug = require('debug')('rtarotbot:index');
const tarot = require('./tarot.js');

const telegramBot = require('./telegram.js')(tarot);
telegramBot.launch();
debug('r/Tarot telegram bot started');

debug('r/Tarot bot started');