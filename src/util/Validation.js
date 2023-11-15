import {
  ERROR_MESSAGES,
  MONTH_EVENT_RULES,
  MENU,
} from '../constant/Constants.js';

const checkInputNumber = (input) => {
  if (input.match(/\D/g)) throw new Error(ERROR_MESSAGES.invalidDate);
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

const checkDate = (date) => {
  checkDateRange(date);
  checkDateLength(date);
  checkInputNumber(date);
  checkInputBlank(date);
  checkInputSpace(date);
};

const checkMenu = (menus) => {
  checkMenuExistence(menus);
};

export { checkDate, checkMenu };
