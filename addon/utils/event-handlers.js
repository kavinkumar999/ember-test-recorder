export default class EventAdapter {
  constructor(testCaseGenerator, eventManager) {
    this.testCaseGenerator = testCaseGenerator;
    this.eventManager = eventManager;
  }

  commonHandler(event, options = {}) {
    const element = event.target;
    const { allowedElements = [], notAllowedElements = [] } = options;

    if (!this.eventManager.isEventEnabled(event.type)) {
      return false;
    }

    if (!element || !this.testCaseGenerator.isRecording) {
      return false;
    }
    if (notAllowedElements.includes(element.tagName.toLowerCase())) {
      return false;
    }
    if (allowedElements.length && !element.matches(allowedElements.join(', '))) {
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

    if (this.testCaseGenerator.assertionMode) {
      return this.testCaseGenerator.addAssertion(this.testCaseGenerator.assertionType, selector, element);
    }

    return this.testCaseGenerator.addStep({
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

  handlePopState() {
    if (!this.testCaseGenerator.isRecording || this.testCaseGenerator.assertionMode) {
      return;
    }

    setTimeout(() => {
      const currentPath = window.location.hash.slice(1);

      this.testCaseGenerator.addStep({
        action: 'visit',
        selector: currentPath
      });
    }, 0);
  }

  getSelector(element) {
    const directTestAttr = element.attributes && Array.from(element.attributes).find((attr) => attr.name.match(/^data-test-/));

    if (directTestAttr) {
      return `[${directTestAttr.name}="${directTestAttr.value}"]`;
    }

    const ancestors = [];
    let current = element.parentElement;
    let depth = 1;

    while (current) {
      const testAttr = Array.from(current.attributes).find((attr) => attr.name.match(/^data-test-/));
      if (testAttr) {
        ancestors.push({ element: current, attr: testAttr, depth });
      }
      current = current.parentElement;
      depth++;
    }

    if (!ancestors.length) {
      return false;
    }

    const closest = ancestors.reduce((min, curr) => (curr.depth < min.depth ? curr : min));

    return `[${closest.attr.name}="${closest.attr.value}"]`;
  }
}
