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

const checkMenuAmount = (menus) => {
  menus.forEach((menu) => {
    if (!menu[1] || menu[1].match(/\D/g))
      throw new Error(ERROR_MESSAGES.invalidMenu);
  });
};

const checkMenuFormat = (menus) => {
  let format = /^([A-Za-z가-힣]+)-([1-9][0-9]*|0)$/;
  menus.split(',').map((menu) => {
    if (!format.test(menu)) throw new Error(ERROR_MESSAGES.invalidMenu);
  });
};

const checkMenuDuplicated = (menus) => {
  let menuList = new Set();
  menus.forEach((menu) => menuList.add(menu[0]));
  if (menus.length !== menuList.size)
    throw new Error(ERROR_MESSAGES.invalidMenu);
};

const checkMenuExcess = (menus) => {
  let menuAmount = menus.reduce((amount, menu) => (amount += menu[1]), 0);
  if (menuAmount > MONTH_EVENT_RULES.menuExcess)
    throw new Error(ERROR_MESSAGES.menuAmount);
};

const checkDate = (date) => {
  checkDateRange(date);
  checkDateLength(date);
  checkInputNumber(date);
  checkInputBlank(date);
  checkInputSpace(date);
};

const checkMenu = (menus) => {
  let menuSplit;
  checkMenuFormat(menus);
  menuSplit = menus.split(',').map((input) => input.split('-'));
  checkMenuDuplicated(menuSplit);
  checkMenuExistence(menuSplit);
  checkMenuAmount(menuSplit);
  checkMenuExcess(menuSplit);
};

export { checkDate, checkMenu };
