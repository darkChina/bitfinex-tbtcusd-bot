const { Telegraf } = require('telegraf');
const Markup = require('telegraf/markup');
const BOT_TOKEN = '1475900470:AAES0hsBltKMQ8-UCOd6-BY09bvM-PlhpmU';

const covidData = require('covid19-api');

const bot = new Telegraf(BOT_TOKEN);

bot.start(ctx =>
  ctx.reply(
    `Welcome, ${ctx.message.from.first_name}!`,
    Markup.keyboard([['US', 'Russia', 'Japan', 'China']]).extra()
  )
);
bot.help(ctx => ctx.reply('Send me a sticker ' + firstName));
bot.on('sticker', ctx => ctx.reply('👍'));
bot.on('message', async ctx => {
  let data = {};

  try {
    data = await covidData.getReportsByCountries([ctx.message.text]);
    ctx.reply(`
Страна: ${data[0][0].country[0]}
Всего заболевших: ${data[0][0].cases}
Смертей ${data[0][0].deaths}
Вылечилось ${data[0][0].recovered}`);
  } catch {
    ctx.reply('There is no country you are looking for...');
  }
});
bot.hears('hi', ctx => ctx.reply(`Hey ${ctx.message.from.first_name}`));
bot.launch();
