import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TestRecorderSidebarComponent extends Component {
  @service testCaseGenerator;
  @tracked isRecording = false;
  @tracked assertionMode = false;
  @tracked assertionType = 'ok';

  get testCases() {
    return this.testCaseGenerator.testCaseCode.map((testCase) => testCase.code);
  }

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
    if (this.testCases.length > 0) {
      navigator.clipboard.writeText(this.testCases.join('\n'));
      alert('Tests copied to clipboard!');
    }
  }

  @action
  clearTests() {
    this.testCaseGenerator.clear();
  }

  startTestRecording() {
    this.testCaseGenerator.startRecording();
  }

  stopTestRecording() {
    this.testCaseGenerator.stopRecording();
  }

  @action
  toggleAssertionMode(event) {
    this.assertionMode = event.target.checked;
    this.testCaseGenerator.setAssertionMode(this.assertionMode);
  }

  @action
  setAssertionType(type) {
    this.assertionType = type;
    this.testCaseGenerator.setAssertionType(type);
  }
}
