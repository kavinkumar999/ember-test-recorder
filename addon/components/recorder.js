import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TestRecorderComponent extends Component {
  @tracked isSidebarOpen = false;

  @action
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
