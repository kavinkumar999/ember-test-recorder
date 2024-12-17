import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TestRecorderSidebarComponent extends Component {
  @service testCaseGenerator;
  @tracked isRecording = false;

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
    if (this.testCaseGenerator.testCaseCode.length > 0) {
      navigator.clipboard.writeText(this.testCaseGenerator.testCaseCode.join('\n'));
      alert('Tests copied to clipboard!');
    }
  }

  @action
  clearTests() {
    this.testCaseGenerator.clear();
  }

  startTestRecording() {
    console.log('Test recording started');
  }

  stopTestRecording() {
    console.log('Test recording stopped');
  }
}
