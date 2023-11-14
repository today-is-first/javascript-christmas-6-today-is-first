const MENU = {
  appetizers: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  main: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  desert: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  drink: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
};

const MONTH_EVENT_RULES = {
  eventMonth: 12,
  eventDateMax: 31,
  weekdayDiscount: 2023,
  weekendDiscount: 2023,
  menuMaxNum: 20,
  giftEventThreshold: 120000,
  gift: ['샴페인', 25000, 1],
};

const CHRISTMAS_EVENT_RULES = {
  rangeMin: 1,
  rangeMax: 25,
  totalDiscount: (date) => {
    CHRISTMAS_EVENT_RULES.initialDiscountCost +
      (date - 1) * CHRISTMAS_EVENT_RULES.discountPerDay;
  },
  initialDiscountCost: 1000,
  discountPerDay: 100,
};

const INPUT_MESSAGES = {
  readDate: `${MONTH_EVENT_RULES.eventMonth}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  readMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const PRINT_MESSAGES = {
  intro: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  outtro: (date) =>
    `${MONTH_EVENT_RULES.eventMonth}월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  orderedMenu: `\n<주문 메뉴>`,
  menu: (menu, amount) => `${menu} ${amount}개`,
  beforeDiscountCost: '\n<할인 전 총주문 금액>',
  afterDiscountCost: '\n<할인 후 예상 결제 금액>',
  giftMenu: '\n<증정 메뉴>',
  advantageList: '\n<혜택 내역>',
  totalAdvantageCost: '\n<총혜택 금액>',
  eventBadge: `\n<${MONTH_EVENT_RULES.eventMonth}월 이벤트 배지>`,
  nothing: '없음',
  costSplit: (cost) =>
    cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원',
};

const ERROR_MESSAGES = {};

export {
  INPUT_MESSAGES,
  ERROR_MESSAGES,
  PRINT_MESSAGES,
  MENU,
  MONTH_EVENT_RULES,
};
