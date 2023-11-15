import { Console } from '@woowacourse/mission-utils';
import OutputView from '../src/util/OutputView.js';
import {
  PRINT_MESSAGES,
  MONTH_EVENT_RULES,
  EVENT_NAME,
} from '../src/constant/Constants.js';

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join('\n');
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('OutputView 테스트', () => {
  let logSpy;
  let menus;
  beforeEach(() => {
    logSpy = getLogSpy();
    menus = [
      ['양송이수프', '1'],
      ['타파스', '1'],
      ['티본스테이크', '2'],
      ['바비큐립', '1'],
    ];
  });
  test('printMenu 테스트', () => {
    const expected = [
      PRINT_MESSAGES.orderedMenu,
      PRINT_MESSAGES.menu('양송이수프', '1'),
      PRINT_MESSAGES.menu('타파스', '1'),
      PRINT_MESSAGES.menu('티본스테이크', '2'),
      PRINT_MESSAGES.menu('바비큐립', '1'),
    ];

    OutputView.printMenu(menus);

    expectLogContains(getOutput(logSpy), expected);
  });

  test('printBeforeDiscountCost 테스트', () => {
    const expected = [
      PRINT_MESSAGES.beforeDiscountCost,
      PRINT_MESSAGES.costSplit(175500),
      '175,500원',
    ];

    let result = OutputView.printBeforeDiscountCost(menus);

    expect(result).toBe(175500);
    expectLogContains(getOutput(logSpy), expected);
  });

  describe('printGiftMenu 테스트', () => {
    test('120000원 이상이면 증정', () => {
      const beforeDiscountCost = 130000;
      const expected = [
        PRINT_MESSAGES.giftMenu,
        PRINT_MESSAGES.menu(
          MONTH_EVENT_RULES.gift[0],
          MONTH_EVENT_RULES.gift[2],
        ),
      ];

      let result = OutputView.printGiftMenu(beforeDiscountCost);

      expect(result).toEqual([EVENT_NAME.gift, MONTH_EVENT_RULES.gift[1]]);
      expectLogContains(getOutput(logSpy), expected);
    });

    test('120000원 미만이면 증정안함', () => {
      const beforeDiscountCost = 110000;
      const expected = [PRINT_MESSAGES.giftMenu, PRINT_MESSAGES.nothing];

      let result = OutputView.printGiftMenu(beforeDiscountCost);

      expect(result).toEqual([PRINT_MESSAGES.nothing, 0]);
      expectLogContains(getOutput(logSpy), expected);
    });
  });

  describe('printAdvantageList 테스트', () => {
    test('받은 혜택이 없으면 없음 출력', () => {
      const advantageList = [
        ['없음', '0'],
        ['평일 할인', '0'],
      ];
      const expected = [PRINT_MESSAGES.advantageList, PRINT_MESSAGES.nothing];

      OutputView.printAdvantageList(advantageList);

      expectLogContains(getOutput(logSpy), expected);
    });
    test('받은 혜택이 있으면 내역만 출력', () => {
      const advantageList = [
        ['없음', '0'],
        ['크리스마스 디데이 할인', '3400'],
        ['주말 할인', '0'],
        ['평일 할인', '2023'],
        ['증정 이벤트', '25000'],
      ];

      const expected = [
        PRINT_MESSAGES.advantageList,
        PRINT_MESSAGES.advantage(['크리스마스 디데이 할인', '3400']),
        PRINT_MESSAGES.advantage(['평일 할인', '2023']),
        PRINT_MESSAGES.advantage(['증정 이벤트', '25000']),
      ];

      OutputView.printAdvantageList(advantageList);

      expectLogContains(getOutput(logSpy), expected);
    });
  });
});
