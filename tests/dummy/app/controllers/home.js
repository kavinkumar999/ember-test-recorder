import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class HomeController extends Controller {
  @tracked username = '';
  @tracked email = '';
  @tracked phoneNumber = '';
  @tracked id = '';
  @tracked submitSuccess = false;
  @tracked clickCount = 0;

  @action
  updateField(field, event) {
    this[field] = event.target.value;
  }

  @action
  onSubmit(event) {
    event.preventDefault();
    this.submitSuccess = true;

    // Reset after 2 seconds
    setTimeout(() => {
      this.submitSuccess = false;
      this.username = '';
      this.email = '';
      this.phoneNumber = '';
      this.id = '';
    }, 4000);
  }
}
