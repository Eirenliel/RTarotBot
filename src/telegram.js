const config = require('../config.js');
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const fs = require('fs');

function getPack(tarot, ctx) {
    return tarot.defaultPack;
}

function sendCardWithCaption(ctx, card) {
    ctx.replyWithPhoto({source: fs.createReadStream('./assets/' + card.image)}, Extra.caption(card.name).markdown());
}

function sendMultipleCardsWithCaption(ctx, cards) {
    let mediaGroup = [];
    for(let i = 0; i < cards.length; ++i) {
        mediaGroup[i] = {
            media: {source: fs.createReadStream('./assets/' + cards[i].image)},
            type: 'photo',
            caption: cards[i].name
        };
    }
    ctx.replyWithMediaGroup(mediaGroup);
}

module.exports = (tarot) => {
    let telegramBot = new Telegraf(config.telegram.key);
    telegramBot.command('help', (ctx) => {
        ctx.reply('I can draw tarot cards for your telegram chat.\n' +
                'See the list of commands to draw.\n\n' +
                'Card images used are in public domain or free to use. The bot was created for r/Tarot subreddit and is open source. You can contribute to it [on Github](https://github.com/Eirenliel/RTarotBot). It doesn\'t store any logs or private information.');
    });
    telegramBot.on('start', (ctx) => {
        ctx.reply('I can draw tarot cards for your telegram chat. Send me commands in private message or in a group I\'m in.\n' +
                'See the list of commands to draw.\n\n' +
                'Card images used are in public domain or free to use. The bot was created for r/Tarot subreddit and is open source. You can contribute to it [on Github](https://github.com/Eirenliel/RTarotBot). It doesn\'t store any logs or private information.');
    });
    telegramBot.command('draw', (ctx) => {
        let pack = getPack(tarot, ctx);
        let randomCard = tarot.randomCard(pack);
        sendCardWithCaption(ctx, randomCard);
    });
    telegramBot.command('draw_minor', (ctx) => {
        let pack = getPack(tarot, ctx);
        let randomCard = tarot.randomMinor(pack);
        sendCardWithCaption(ctx, randomCard);
    });
    telegramBot.command('draw_major', (ctx) => {
        let pack = getPack(tarot, ctx);
        let randomCard = tarot.randomMajor(pack);
        sendCardWithCaption(ctx, randomCard);
    });
    telegramBot.command('draw3', (ctx) => {
        let pack = getPack(tarot, ctx);
        let randomCard1 = tarot.randomCard(pack);
        let randomCard2 = tarot.randomCard(pack);
        let randomCard3 = tarot.randomCard(pack);
        while(randomCard1 == randomCard2)
            randomCard2 = tarot.randomCard(pack);
        while(randomCard1 == randomCard3 || randomCard2 == randomCard3)
            randomCard3 = tarot.randomCard(pack);
        sendMultipleCardsWithCaption(ctx, [randomCard1, randomCard2, randomCard3]);
    });
    telegramBot.command('draw3_major', (ctx) => {
        let pack = getPack(tarot, ctx);
        let randomCard1 = tarot.randomMajor(pack);
        let randomCard2 = tarot.randomMajor(pack);
        let randomCard3 = tarot.randomMajor(pack);
        while(randomCard1 == randomCard2)
            randomCard2 = tarot.randomMajor(pack);
        while(randomCard1 == randomCard3 || randomCard2 == randomCard3)
            randomCard3 = tarot.randomMajor(pack);
        sendMultipleCardsWithCaption(ctx, [randomCard1, randomCard2, randomCard3]);
    });
    return telegramBot;
};
