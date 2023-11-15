import { Console } from '@woowacourse/mission-utils';
import InputView from '../util/InputView.js';
import OutputView from '../util/OutputView.js';
import {
  CHRISTMAS_EVENT_RULES,
  MONTH_EVENT_RULES,
  PRINT_MESSAGES,
  MENU,
  EVENT_NAME,
} from '../constant/Constants.js';

class Main {
  constructor() {
    this.advantageList = [];
    this.totalAdvantageCost = 0;
  }

  async start() {
    Console.print(PRINT_MESSAGES.intro);
    this.date = await InputView.readDate();
    this.menu = await InputView.readMenu();
    Console.print(PRINT_MESSAGES.outtro(this.date));
    OutputView.printMenu(this.menu);
    this.beforeDiscountCost = OutputView.printBeforeDiscountCost(this.menu);
    this.advantageList.push(OutputView.printGiftMenu(this.beforeDiscountCost));
    this.discount();
    this.totalAdvantageCost = this.advantageList.reduce(
      (acc, cur) => (acc -= cur[1]),
      0,
    );
    OutputView.printAdvantageList(this.advantageList);
    OutputView.printTotalAdvantageCost(this.totalAdvantageCost);
    OutputView.printAfterDiscountCost(
      this.beforeDiscountCost,
      this.totalAdvantageCost,
    );
    OutputView.printEventBadge(this.totalAdvantageCost * -1);
  }

  discount() {
    this.christmasEvent();
    this.specialDiscount();
    if (
      !((this.date - MONTH_EVENT_RULES.firstFriday) % 7) ||
      !((this.date - MONTH_EVENT_RULES.firstSaturday) % 7)
    ) {
      this.weekendDiscount(this.menu);
    } else if (
      (this.date - MONTH_EVENT_RULES.firstFriday) % 7 &&
      (this.date - MONTH_EVENT_RULES.firstSaturday) % 7
    ) {
      this.weekdayDiscount(this.menu);
    }
  }

  christmasEvent() {
    if (this.date <= CHRISTMAS_EVENT_RULES.rangeMax) {
      this.advantageList.push([
        EVENT_NAME.christmas,
        CHRISTMAS_EVENT_RULES.totalDiscount(this.date),
      ]);
    }
  }

  weekdayDiscount(menus) {
    let discountAmount = 0;
    menus.forEach((menu) => {
      if (MENU.desert[menu[0]]) {
        discountAmount += menu[1];
      }
    });
    this.advantageList.push([
      EVENT_NAME.weekday,
      MONTH_EVENT_RULES.weekdayDiscount * discountAmount,
    ]);
  }

  weekendDiscount(menus) {
    let discountAmount = 0;
    menus.forEach((menu) => {
      if (MENU.main[menu[0]]) {
        discountAmount += menu[1];
      }
    });
    this.advantageList.push([
      EVENT_NAME.weekend,
      MONTH_EVENT_RULES.weekendDiscount * discountAmount,
    ]);
  }

  specialDiscount() {
    if (this.date === '25' || !((this.date - 3) % 7))
      this.advantageList.push([
        EVENT_NAME.special,
        MONTH_EVENT_RULES.specialDiscount,
      ]);
  }
}

const main = new Main();
main.start();
