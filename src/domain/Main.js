import { Console } from '@woowacourse/mission-utils';
import InputView from '../util/InputView.js';
import OutputView from '../util/OutputView.js';
import { PRINT_MESSAGES } from '../constant/Constants.js';
class Main {
  async start() {
    Console.print(PRINT_MESSAGES.intro);
    this.date = await InputView.readDate();
    this.menu = await InputView.readMenu();
    OutputView.printMenu(this.menu);
  }
}

const main = new Main();
main.start();
