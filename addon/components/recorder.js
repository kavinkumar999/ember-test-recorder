import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { setupAllEvents } from '../utils/setup';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RecorderComponent extends Component {
  @tracked isSidebarOpen = false;
  constructor() {
    super(...arguments);
    const owner = getOwner(this);
    setupAllEvents(this, owner);
  }

  @action
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
