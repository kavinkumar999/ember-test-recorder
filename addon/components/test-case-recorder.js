import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import TestRecorderInitializer from '../utils/index';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecorderComponent extends Component {
  @service testRecorderConfig;
  @tracked isSidebarOpen = false;

  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    this.testRecorderInitializer = new TestRecorderInitializer(this, owner);

    if (this.args.config) {
      this.testRecorderConfig.configure(this.args.config);
    }

    this.testRecorderInitializer.initialize();
  }

  @action
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
