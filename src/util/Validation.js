import {
  ERROR_MESSAGES,
  MONTH_EVENT_RULES,
  MENU,
} from '../constant/Constants.js';

const checkInputNumber = (input, message) => {
  if (input.match(/\D/g)) throw new Error(message);
};

const checkInputSpace = (input) => {
  if (input.match(' ')) throw new Error(ERROR_MESSAGES.inputSpace);
};

const checkInputBlank = (input) => {
  if (input === '') throw new Error(ERROR_MESSAGES.inputBlank);
};

const checkDateLength = (date) => {
  if (date.split(',').length !== 1) throw new Error(ERROR_MESSAGES.dateLength);
};

const checkDateRange = (date) => {
  if (
    date < MONTH_EVENT_RULES.eventDateMin ||
    date > MONTH_EVENT_RULES.eventDateMax
  )
    throw new Error(ERROR_MESSAGES.invalidDate);
};

const checkMenuExistence = (menus) => {
  let existence = false;
  menus.forEach((menu) =>
    Object.keys(MENU).forEach((type) => {
      if (MENU[type][menu[0]]) {
        existence = true;
      }
    }),
  );
  if (!existence) throw new Error(ERROR_MESSAGES.invalidMenu);
};
