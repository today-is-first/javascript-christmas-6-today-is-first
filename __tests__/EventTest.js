import { MissionUtils } from '@woowacourse/mission-utils';
import Event from '../src/domain/Event.js';
import {
  PRINT_MESSAGES,
  EVENT_NAME,
  CHRISTMAS_EVENT_RULES,
  MONTH_EVENT_RULES,
} from '../src/constant/Constants.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
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

describe('Event.js 테스트', () => {
  let event;
  beforeEach(() => {
    event = new Event();
  });
  test('getUserInput 테스트', async () => {
    const logSpy = getLogSpy();
    mockQuestions([
      '34',
      'ㄱㅁㄴ',
      '25',
      '티본스테이크-',
      '레드와인-1',
      '티본스테이크-1',
    ]);
    const expected = [
      PRINT_MESSAGES.intro,
      PRINT_MESSAGES.outtro('25'),
      PRINT_MESSAGES.orderedMenu,
      PRINT_MESSAGES.menu('티본스테이크', '1'),
    ];

    await event.getUserInput();

    expect(event.date).toBe('25');
    expect(event.menu).toEqual([['티본스테이크', '1']]);

    expectLogContains(getOutput(logSpy), expected);
  });

  test('eventDiscount 테스트', () => {
    event.date = '25';
    event.menu = [
      ['티본스테이크', '5'],
      ['레드와인', '3'],
      ['타파스', '1'],
      ['제로콜라', '1'],
    ];

    event.eventDiscount();

    expect(event.totalAdvantageCost).toBe(-29400);
  });

  describe('discount 테스트', () => {
    test('주말에는 메인 요리에 주말 할인을 함', () => {
      event.menu = [
        ['레드와인', '1'],
        ['크리스마스파스타', '1'],
        ['아이스크림', '1'],
      ];
      event.date = '1';

      event.discount();

      expect(event.advantageList).toEqual([
        [EVENT_NAME.christmas, CHRISTMAS_EVENT_RULES.totalDiscount(event.date)],
        [EVENT_NAME.weekend, MONTH_EVENT_RULES.weekendDiscount * 1],
      ]);
    });

    test('평일에는 디저트 요리에 평일 할인을 함', () => {
      event.menu = [
        ['레드와인', '1'],
        ['크리스마스파스타', '1'],
        ['아이스크림', '3'],
      ];
      event.date = '4';

      event.discount();

      expect(event.advantageList).toEqual([
        [EVENT_NAME.christmas, CHRISTMAS_EVENT_RULES.totalDiscount(event.date)],
        [EVENT_NAME.weekday, MONTH_EVENT_RULES.weekdayDiscount * 3],
      ]);
    });
  });

  describe('chirstmasEvent 테스트', () => {
    test('25일은 크리스마스 이벤트가 진행됨.', () => {
      event.date = '25';

      event.christmasEvent();

      expect(event.advantageList).toEqual([
        [EVENT_NAME.christmas, CHRISTMAS_EVENT_RULES.totalDiscount(event.date)],
      ]);
    });

    test('26일은 크리스마스 이벤트가 끝남', () => {
      event.date = '26';

      event.christmasEvent();

      expect(event.advantageList).toEqual([]);
    });
  });

  describe('specialDiscount 테스트', () => {
    test('별이 쳐져있는 날에는 특별할인 함', () => {
      event.date = '25';

      event.specialDiscount();

      expect(event.advantageList).toEqual([
        [EVENT_NAME.special, MONTH_EVENT_RULES.specialDiscount],
      ]);
    });
    test('별이 안쳐져있는 날에는 특별할인 안함', () => {
      event.date = '26';

      event.specialDiscount();

      expect(event.advantageList).toEqual([]);
    });
  });
  test('weekendDiscount 테스트', () => {
    const menu = [
      ['티본스테이크', '5'],
      ['레드와인', '3'],
      ['타파스', '1'],
      ['제로콜라', '1'],
    ];

    event.weekendDiscount(menu);

    expect(event.advantageList).toEqual([
      [EVENT_NAME.weekend, MONTH_EVENT_RULES.weekendDiscount * 5],
    ]);
  });

  test('weekdayDiscount 테스트', () => {
    const menu = [
      ['티본스테이크', '5'],
      ['레드와인', '3'],
      ['초코케이크', '1'],
      ['아이스크림', '1'],
    ];

    event.weekdayDiscount(menu);

    expect(event.advantageList).toEqual([
      [EVENT_NAME.weekday, MONTH_EVENT_RULES.weekdayDiscount * 2],
    ]);
  });
});
