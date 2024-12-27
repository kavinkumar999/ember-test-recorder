import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AssertionsController extends Controller {
  @tracked counter = 0;
  @tracked isVisible = true;
  @tracked isActive = false;

  @action
  increment() {
    this.counter++;
  }

  @action
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  @action
  toggleStatus() {
    this.isActive = !this.isActive;
  }
}
