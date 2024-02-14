import "dotenv/config.js";
import { Telegraf, Markup } from "telegraf";
import client from "./db.js";
import { QS_LIST, KEY_LIST, ANS_LIST } from "./constants.js";

const { log } = console;

const ACTUAL_EVENT = "WB0021";
let REGISTER_MSG = "";

const bot = new Telegraf(process.env.BOT_TOKEN, {
  channelMode: true,
});

const botCommandsList = `\n\nSee MENU for available commands :)`;

bot.start(async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Hello, <b>${ctx.chat.username}</b>!\n\n🎉 Welcome to our vibrant live events community!\n\nJoin us and be part of an enthusiastic community passionate about growth, knowledge, and unforgettable moments! 🚀✨\n\n${botCommandsList}`,
    { parse_mode: "HTML" }
  );

  await bot.telegram.setMyCommands([
    { command: "start", description: "Start the bot" },
    { command: "myevents", description: "Your events (hardcoded)" },
    { command: "register", description: "Register current event" },
    { command: "whisper", description: "Write us a message" },
    { command: "about", description: "About the bot" },
    // { command: "foo", description: "GAME TESTING" },
    { command: "test", description: "TEST COMMAND" },
  ]);
});

bot.command("about", (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `Bot for collecting data about live events.`
  );
});

bot.command("myevents", (ctx) => {
  const id = ctx.update.message.from.id;
  const username = ctx.update.message.from.username;
  const names = [
    "<b>W001</b> - 23.12.44",
    "<b>W002</b> - Event name example with description possible",
    "<b>W003</b>",
    "<b>W004</b>",
  ];

  const formattedList = names
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");
  const list = `<b>Events:</b>\n${formattedList}`;

  ctx.replyWithHTML(
    `Here is the list of your events:\n\nID: <b>${id}</b> Profile: <b>${username}</b>\n\n${list}\n\n${botCommandsList}`
  );
});

bot.command("register", (ctx) => {
  const id = ctx.update.message.from.id;
  const username = ctx.update.message.from.username;

  ctx.replyWithHTML(
    `Here you can register in our last event!\n(registration closes in <b>2</b> days)\n\nID: <b>${id}</b> Profile: <b>${username}</b>\n\n Current available event: <b>WB003</b>. \n\n Be sure that you participated in that event\n and click register below`,
    KEY_LIST.reg
  );
});

bot.command("whisper", (ctx) => {
  ctx.replyWithHTML(
    `🌟If you any questions, suggestions or something you wanna talk about please feel free to get in touch with us!\nYour message should look like this:\n\n📧 myemail@email.com\n🗒️ my message.\n\nOur dedicated team will review your request and get back to you shortly. Thank you! 😊\n\n${botCommandsList}`
  );
});

bot.action("Register", async (ctx) => {
  const { username, id } = ctx.update.callback_query.from;

  try {
    const query =
      "UPDATE users SET events = 'ahaha' WHERE user_id = '918542960';";
    const values = ["450971244", `, lol event`];
    const result = await client.query(query);
    // console.log(result);
  } catch (error) {
    console.log(error);
  }

  await ctx.editMessageText(
    `You are registreted in event!\nID: ${id}\nProfile: ${username} \n\nYour impact: ${REGISTER_MSG} \n\nThanky you! \n\n /start`
  );

  // await ctx.answerCbQuery(
  //   `You are registreted in event!\nID: ${id}\nProfile: ${username}`
  // );
});

// QUIZ RREGISTER FLOW PLAY

let countRight = 0;

bot.command("test", async (ctx) => {
  const { username, id } = ctx.update.message.from;
  const GREET = `\n\nID: <b>${id}</b> Profile: <b>${username}</b> \n\nСейчас все правильные ответы под номером два (для тестов) \n\n`;

  // RELOAD ANSWERS COUNT
  countRight = 0;

  // QUIZ TYPE SH research hot to catch QUIZ/POLL action
  // ctx.replyWithQuiz("Тут будет первый вопрос?", ["Варик один", "Варик два"], {
  //   correct_option_id: 0,
  //   type: "quiz",
  //   open_period: 60,
  // });

  await ctx.replyWithHTML(GREET + QS_LIST.first, KEY_LIST.first);
});

bot.on("callback_query", async (ctx) => {
  const { message, data } = ctx.update.callback_query;
  console.log("trig");

  if (message.text.includes(QS_LIST.first)) {
    if (data === ANS_LIST.first) countRight++;
    ctx.editMessageReplyMarkup();
    ctx.editMessageText(`${QS_LIST.first} \n\nВаш ответ: ${data}`);
    await ctx.replyWithHTML(QS_LIST.second, KEY_LIST.second);
  }

  if (message.text.includes(QS_LIST.second)) {
    if (data === ANS_LIST.second) countRight++;
    ctx.editMessageReplyMarkup();
    ctx.editMessageText(`${QS_LIST.first} \n\nВаш ответ: ${data}`);
    await ctx.replyWithHTML(QS_LIST.third, KEY_LIST.third);
  }

  if (message.text.includes(QS_LIST.third)) {
    if (data === ANS_LIST.third) countRight++;
    ctx.editMessageReplyMarkup();
    ctx.editMessageText(`${QS_LIST.first} \n\nВаш ответ: ${data}`);
    await ctx.replyWithHTML(
      "Спасибо за ваши старания\n\nКоличество правильных ответов: " +
        `<b>${countRight}</b> \n\nОпишите кратко ываш вклад в ивент (просто в чат):`
    );
  }

  bot.on("message", (ctx) => {
    console.log(ctx.update.message.text);

    REGISTER_MSG = ctx.update.message.text;

    ctx.replyWithHTML(
      `Теперь вы можете зарегать ивент: <b>${ACTUAL_EVENT}</b>`,
      KEY_LIST.reg
    );
  });
});

bot.launch();
