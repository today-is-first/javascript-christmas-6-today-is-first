import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGES } from '../constant/Constants.js';
import { checkDate, checkMenu } from './Validation.js';

const InputView = {
  async readDate() {
    let inputs;
    try {
      inputs = await Console.readLineAsync(INPUT_MESSAGES.readDate);
      checkDate(inputs);
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
      checkMenu(inputs);
    } catch (error) {
      Console.print(error.message);
      inputs = await this.readMenu();
    }
    return inputs;
  },
};

export default InputView;
