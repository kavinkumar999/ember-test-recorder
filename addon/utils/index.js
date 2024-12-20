import { setupAllEvents } from './setup';

export default class TestRecorderInitializer {
  constructor(context, owner) {
    this.context = context;
    this.owner = owner;
  }

  initialize() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const cleanup = setupAllEvents(this, this.owner);
    this._eventCleanup = cleanup;
  }

  removeEventListeners() {
    if (this._eventCleanup) {
      this._eventCleanup();
    }
  }
}
