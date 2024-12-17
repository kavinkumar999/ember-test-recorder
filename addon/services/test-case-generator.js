import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TestCaseGeneratorService extends Service {
  @tracked testcasesData = [];
  @tracked testCaseCode = [];
  @tracked isRecording = false;

  constructor() {
    super(...arguments);
    this.clear();
  }

  addStep(stepData) {
    this.testcasesData.push({
      ...stepData,
      timestamp: new Date().getTime(),
      id: `test-${this.testcasesData.length + 1}`
    });

    this.testCode.push(this.getStepCode(stepData));
  }

  clear() {
    this.testcasesData = [];
    this.testCode = [];
  }

  startRecording() {
    this.isRecording = true;
  }

  stopRecording() {
    this.isRecording = false;
  }

  getStepCode(step) {
    switch (step.action) {
      case 'click':
        return `await click('${step.selector}');`;
      case 'typeIn':
        return `await typeIn('${step.selector}', '${step.value}');`;
      case 'fillIn':
        return `await fillIn('${step.selector}', '${step.value}');`;
      case 'blur':
        return `await blur('${step.selector}');`;
      case 'focus':
        return `await focus('${step.selector}');`;
      case 'triggerEvent':
        return `await triggerEvent('${step.selector}', '${step.eventName}');`;
      default:
        return '';
    }
  }
}
