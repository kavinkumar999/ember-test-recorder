import Service from '@ember/service';
export default class TestCaseGeneratorService extends Service {
  constructor() {
    super();
    this.generatedTests = [];
  }

  push(testCase) {
    this.generatedTests.push(testCase);
  }

  clear() {
    this.generatedTests = [];
  }
}
