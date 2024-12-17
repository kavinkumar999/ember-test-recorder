import Component from '@glimmer/component';
import { action } from '@ember/object';
export default class TestRecorderButtonComponent extends Component {
  @action
  handleClick() {
    this.args.onToggleSidebar();
  }
}
