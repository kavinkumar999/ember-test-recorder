import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import TestRecorderInitializer from '../utils/index';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RecorderComponent extends Component {
  @tracked isSidebarOpen = false;
  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    this.testRecorderInitializer = new TestRecorderInitializer(this, owner);
    this.testRecorderInitializer.initialize();
  }

  @action
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
