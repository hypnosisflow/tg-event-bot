bot.start(async (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    ` <b>Hello!</b>\n Your profile name: ${ctx.chat.username}`,
    { parse_mode: "HTML" }
  );
});

bot.command("oldschool", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, `hello ${ctx.chat.username}`);
});

bot.command("about", (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `🎉 Welcome to our vibrant live events community!\n\n🌟 Whether it's insightful discussions, exclusive interviews, or exciting announcements, get ready to immerse yourself in engaging content.\n\nJoin us and be part of an enthusiastic community passionate about growth, knowledge, and unforgettable moments! 🚀✨\n\nCommands available:\n/start\n/pastevents\n/upcoming\n/register\n/whisper\n
       `
  );
});

bot.command("upcoming", (ctx) => {
  const id = ctx.update.message.from.id;
  const username = ctx.update.message.from.username;

  const keys = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Register with my ID", callback_data: "next" }],
        [{ text: "Open in browser", url: "telegraf.js.org" }],
      ],
    },
  };
  ctx.replyWithHTML(
    `Here are event registration simple service\n\nID: <b>${id}</b>\nProfile: <b>${username}</b>\n\n Next event: <b>WB003</b>. \n\n Are you in?`,
    keys
  );
});
