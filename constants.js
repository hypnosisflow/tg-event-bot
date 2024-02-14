export const QS_LIST = {
  first: `Тестим первый вопрос: Что тут не так?`,
  second: "Второй вопросик: определите определение",
  third: "И последний и расход: простой нкопочки потыкай?",
};

export const KEY_LIST = {
  first: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "первый варик", callback_data: "first" }],
        [{ text: "второй варик", callback_data: "two" }],
        [{ text: "третий варик", callback_data: "three" }],
      ],
    },
  },
  second: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "первый варик (2)", callback_data: "first" }],
        [{ text: "второй варик (2)", callback_data: "two" }],
        [{ text: "третий варик (3)", callback_data: "three" }],
      ],
    },
  },
  third: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "первый варик (3)", callback_data: "first" }],
        [{ text: "второй варик (3)", callback_data: "two" }],
        [{ text: "третий варик (3)", callback_data: "three" }],
      ],
    },
  },
  reg: {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Register with my ID", callback_data: "Register" }],
        [{ text: "google.com", url: "google.com" }],
      ],
    },
  },
};

export const ANS_LIST = {
  first: `two`,
  second: "two",
  third: "two",
};
