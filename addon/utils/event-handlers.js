export default class EventAdapter {
  constructor(testCaseGenerator) {
    this.testCaseGenerator = testCaseGenerator;
  }

  commonHandler(event, options = {}) {
    const element = event.target;
    const { allowedElements = [], notAllowedElements = [], closestElementList = [] } = options;
    if (!element) {
      return false;
    }
    if (notAllowedElements.some((_notAllowedElement) => element.type === _notAllowedElement)) {
      return false;
    }
    if (closestElementList.some((selector) => element.closest(selector))) {
      return false;
    }
    if (allowedElements.length && !element.matches(allowedElements.join(', '))) {
      return false;
    }
    if (!this.testCaseGenerator.isRecording) {
      return false;
    }
    if (!this.getSelector(element)) {
      return false;
    }
    return true;
  }

  handleClick(event) {
    if (!this.commonHandler(event, { notAllowedElements: ['textarea', 'input', 'text'] })) {
      return;
    }

    const element = event.target;
    const selector = this.getSelector(element);

    this.testCaseGenerator.addStep({
      action: 'click',
      selector,
      element: element.outerHTML
    });
  }

  handleInput(event) {
    if (!this.commonHandler(event, { allowedElements: ['input', 'textarea', 'select'] })) {
      return;
    }

    const element = event.target;
    const selector = this.getSelector(element);

    this.testCaseGenerator.addStep({
      action: 'fillIn',
      selector,
      value: element.value,
      element: element.outerHTML
    });
  }

  handleFocus(event) {
    if (!this.commonHandler(event, { allowedElements: ['input', 'textarea', 'select'] })) {
      return;
    }

    const element = event.target;
    const selector = this.getSelector(element);

    this.testCaseGenerator.addStep({
      action: 'focus',
      selector,
      element: element.outerHTML
    });
  }

  handleBlur(event) {
    if (!this.commonHandler(event, { allowedElements: ['input', 'textarea', 'select'] })) {
      return;
    }

    const element = event.target;
    const selector = this.getSelector(element);

    this.testCaseGenerator.addStep({
      action: 'blur',
      selector,
      element: element.outerHTML
    });
  }

  handleSubmit(event) {
    if (!this.commonHandler(event, { allowedElements: ['form'] })) {
      return;
    }

    const element = event.target;
    const selector = this.getSelector(element);

    this.testCaseGenerator.addStep({
      action: 'triggerEvent',
      selector,
      eventName: 'submit',
      element: element.outerHTML
    });
  }

  getSelector(element) {
    const testSelector = Array.from(element.attributes).find((attr) => attr.name.startsWith('data-test-'));

    if (testSelector) {
      return `[${testSelector.name}="${testSelector.value}"]`;
    }

    return false;
  }
}
