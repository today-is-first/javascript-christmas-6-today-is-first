import { checkDate, checkMenu } from '../src/util/Validation.js';
import {
  ERROR_MESSAGES,
  MONTH_EVENT_RULES,
  MENU,
} from '../src/constant/Constants.js';

describe('validation 테스트', () => {
  test.each([[''], ['0'], ['1,2'], ['aa']])('checkDate 테스트', (input) => {
    expect(() => checkDate(input)).toThrow('[ERROR]');
  });

  test.each([
    [''],
    ['양송이--1'],
    ['양송이수프-1,양송이수프-1'],
    ['야채죽-1'],
    ['양송이수프-ㅋ'],
    ['양송이수프-0'],
    ['양송이수프-22'],
    ['제로콜라-1'],
  ])('checkMenu 테스트', (input) => {
    expect(() => checkMenu(input)).toThrow('[ERROR]');
  });
});
