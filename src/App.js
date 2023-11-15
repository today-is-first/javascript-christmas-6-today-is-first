import Event from './domain/Event.js';

class App {
  async run() {
    const event = new Event();
    await event.eventPlanning();
  }
}

export default App;
