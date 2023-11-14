import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constant/Constants.js';

const InputView = {
  async readDate() {
    let inputs;
    try {
      inputs = await Console.readLineAsync(INPUT_MESSAGES.readDate);
    } catch (error) {
      Console.print(error.message);
      inputs = await this.readDate();
    }
    return inputs;
  },
  async readMenu() {
    let inputs;
    try {
      inputs = await Console.readLineAsync(INPUT_MESSAGES.readMenu);
    } catch (error) {
      Console.print(error.message);
      inputs = await this.readMenu();
    }
    return inputs.split(',').map((input) => input.split('-'));
  },
};

export default InputView;
