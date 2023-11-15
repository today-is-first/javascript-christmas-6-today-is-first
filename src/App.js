import EventPlanner from './domain/EventPlanner.js';

class App {
  async run() {
    const eventPlanner = new EventPlanner();
    await eventPlanner.eventPlanning();
  }
}

export default App;
