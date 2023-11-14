import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constant/Constants.js';

const InputView = {
  async readDate() {
    let input;
    try {
      input = await Console.readLineAsync(INPUT_MESSAGES.readDate);
    } catch (error) {
      Console.print(error.message);
      input = await this.readDate();
    }
    return input;
  },
  async readMenu() {
    let input;
    try {
      input = await Console.readLineAsync(INPUT_MESSAGES.readMenu);
    } catch (error) {
      Console.print(error.message);
      input = await this.readMenu();
    }
    return input;
  },
};

export default InputView;
