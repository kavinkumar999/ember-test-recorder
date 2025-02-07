import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TestRecorderSidebarComponent extends Component {
  @service testCaseGenerator;
  @service eventManager;
  @tracked isRecording = false;
  @tracked assertionMode = false;
  @tracked assertionType = 'ok';
  @tracked activeTab = 'recorder';

  get isRecorderTab() {
    return this.activeTab === 'recorder';
  }

  get isEventsTab() {
    return this.activeTab === 'events';
  }

  get events() {
    return this.eventManager.events;
  }

  get testCases() {
    return this.testCaseGenerator.testCaseCode.map((testCase, index) => ({
      code: testCase.code,
      index
    }));
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
      navigator.clipboard.writeText(this.testCases.map((testCase) => testCase.code).join('\n'));
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

  @action
  removeTest(index) {
    this.testCaseGenerator.removeTestCase(index);
  }

  @action
  setActiveTab(tab) {
    this.activeTab = tab;
  }

  @action
  toggleEvent(eventId) {
    this.eventManager.toggleEvent(eventId);
  }
}
