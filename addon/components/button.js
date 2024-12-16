import Component from '@glimmer/component';
import { action } from '@ember/object';
import { setupAllEvents } from '../utils/setup';
export default class TestRecorderButtonComponent extends Component {
  constructor() {
    super(...arguments);
    setupAllEvents();
  }

  @action
  handleClick() {
    this.args.onToggleSidebar();
  }
}
