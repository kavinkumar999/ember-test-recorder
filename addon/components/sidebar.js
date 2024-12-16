import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TestRecorderSidebarComponent extends Component {
  @tracked isRecording = false;
  @tracked generatedTests = [];

  @action
  toggleRecording() {
    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      this.startTestRecording();
    } else {
      this.stopTestRecording();
    }
  }

  @action
  copyTests() {
    if (this.generatedTests.length > 0) {
      navigator.clipboard.writeText(this.generatedTests.join('\n'));
      alert('Tests copied to clipboard!');
    }
  }

  @action
  clearTests() {
    this.generatedTests = [];
  }

  startTestRecording() {
    console.log('Test recording started');
  }

  stopTestRecording() {
    console.log('Test recording stopped');
  }
}
