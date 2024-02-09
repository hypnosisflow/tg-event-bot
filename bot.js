import "dotenv/config.js";
import { Telegraf, Markup } from "telegraf";
import client from "./db.js";

// console.log(client);

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
  const keys = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Register with my ID", callback_data: "Register" }],
        [{ text: "google.com", url: "google.com" }],
      ],
    },
  };
  ctx.replyWithHTML(
    `Here you can register in our last event!\n(registration closes in <b>2</b> days)\n\nID: <b>${id}</b> Profile: <b>${username}</b>\n\n Current available event: <b>WB003</b>. \n\n Be sure that you participated in that event\n and click register below`,
    keys
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
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  await ctx.editMessageText(
    `You are registreted in event!\nID: ${id}\nProfile: ${username}\n\n${botCommandsList}`
  );

  await ctx.answerCbQuery(
    `You are registreted in event!\nID: ${id}\nProfile: ${username}`
  );
});

bot.command("test", (ctx) => {
  const { username, id } = ctx.update.message.from;

  ctx.replyWithQuiz("Тут будет первый вопрос?", ["Варик один", "Варик два"], {
    correct_option_id: 0,
    type: "quiz",
    open_period: 60,
  });

  console.log(ctx);

  // const keys = {
  //   reply_markup: {
  //     inline_keyboard: [
  //       [{ text: "first", callback_data: "qu1" }],
  //       [{ text: "second", callback_data: "qu1" }],
  //       [{ text: "third", callback_data: "qu1" }],
  //       [{ text: "fourth", callback_data: "qu1" }],
  //     ],
  //   },
  // };
  // ctx.replyWithHTML(`\n\nID: <b>${id}</b> Profile: <b>${username}</b>`, keys);
});

bot.action("qu1", async (ctx) => {
  const { username, id } = ctx.update.callback_query.from;
  console.log(ctx.update.callback_query.from);

  await ctx.answerCbQuery(`EVENT CAPTURE ${id}\nProfile: ${username}`);
});

bot.launch();
