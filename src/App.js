import Main from './domain/Main.js';

class App {
  async run() {
    const main = new Main();
    await main.start();
  }
}

export default App;
