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

    let code = this.getStepCode(stepData);
    let data = {
      id: `${stepData.action}-${stepData.selector}`,
      code
    }
    if (stepData.action === 'fillIn' || stepData.action === 'typeIn') {
      let isKeyExists = this.testCaseCode.find((testCase) => testCase.id === data.id);
      if (isKeyExists) {
        this.testCaseCode =this.testCaseCode.map((testCase) => {
          if (testCase.id === data.id) {
            return {
              ...testCase,
              code: data.code
            }
          }
          return testCase;
        });
        return;
      }
    }

    this.testCaseCode = [...this.testCaseCode, data];
  }

  clear() {
    this.testcasesData = [];
    this.testCaseCode = [];
  }

  startRecording() {
    this.isRecording = true;
    let currentUrl = window.location.hash;
    let selector = currentUrl.slice(1);
    this.addStep({
      action: 'visit',
      selector: selector
    });
  }

  stopRecording() {
    this.isRecording = false;
  }

  getStepCode(step) {
    switch (step.action) {
      case 'click':
        return `await click('${step.selector}');`;
      case 'visit':
        return `await visit('${step.selector}');`;
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
