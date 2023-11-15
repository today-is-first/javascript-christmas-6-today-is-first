const EVENT_NAME = {
  christmas: '크리스마스 디데이 할인',
  weekday: '평일 할인',
  weekend: '주말 할인',
  special: '특별 할인',
  gift: '증정 이벤트',
};

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
  firstFriday: 1,
  firstSaturday: 2,
  eventMonth: 12,
  eventDateMin: 1,
  eventDateMax: 31,
  weekdayDiscount: 2023,
  weekendDiscount: 2023,
  menuMaxNum: 20,
  giftEventThreshold: 120000,
  gift: ['샴페인', 25000, 1],
  specialDiscount: 1000,
};

const CHRISTMAS_EVENT_RULES = {
  rangeMin: 1,
  rangeMax: 25,
  totalDiscount: (date) => {
    return (
      CHRISTMAS_EVENT_RULES.initialDiscountCost +
      (date - 1) * CHRISTMAS_EVENT_RULES.increaseAmount
    );
  },
  initialDiscountCost: 1000,
  increaseAmount: 100,
};

const INPUT_MESSAGES = {
  readDate: `${MONTH_EVENT_RULES.eventMonth}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  readMenu:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

const PRINT_MESSAGES = {
  intro: '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.',
  outtro: (date) =>
    `${MONTH_EVENT_RULES.eventMonth}월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
  orderedMenu: `\n<주문 메뉴>`,
  menu: (menu, amount) => `${menu} ${amount}개`,
  beforeDiscountCost: '\n<할인 전 총주문 금액>',
  afterDiscountCost: '\n<할인 후 예상 결제 금액>',
  giftMenu: '\n<증정 메뉴>',
  advantageList: '\n<혜택 내역>',
  advantage: (advantage) =>
    `${advantage[0]}: -${PRINT_MESSAGES.costSplit(advantage[1])}`,
  totalAdvantageCost: '\n<총혜택 금액>',
  eventBadge: `\n<${MONTH_EVENT_RULES.eventMonth}월 이벤트 배지>`,
  badge: (cost) => {
    if (cost >= 20000) return '산타';
    if (cost >= 10000) return '트리';
    if (cost >= 5000) return '별';
    if (cost < 5000) return '없음';
  },
  nothing: '없음',
  costSplit: (cost) =>
    cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원',
};

const ERROR_MESSAGES = {
  inputNumber: '[ERROR] 방문 날짜는 숫자여야 합니다. 다시 입력해 주세요.',
  dateLength:
    '[ERROR] 방문 날짜는 하루만 입력할 수 있습니다. 다시 입력해 주세요.',
  menuAmount: '[ERROR] 메뉴는 20개를 초과할 수 없습니다. 다시 입력해 주세요.',
  drink: '[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.',
  invalidDate: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  invalidMenu: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  inputBlank: '[ERROR] 입력 값이 없습니다. 다시 입력해 주세요.',
  inputSpace: '[ERROR] 입력 값에 공백이 포함되어 있습니다. 다시 입력해 주세요.',
};

export {
  INPUT_MESSAGES,
  ERROR_MESSAGES,
  PRINT_MESSAGES,
  MENU,
  MONTH_EVENT_RULES,
  CHRISTMAS_EVENT_RULES,
  EVENT_NAME,
};
