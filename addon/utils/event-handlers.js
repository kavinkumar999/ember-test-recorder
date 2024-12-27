export default class EventAdapter {
  constructor(testCaseGenerator) {
    this.testCaseGenerator = testCaseGenerator;
  }

  commonHandler(event, options = {}) {
    const element = event.target;
    const { allowedElements = [], notAllowedElements = [] } = options;
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
    const testAttribute = Array.from(element.attributes).find((attr) => attr.name.startsWith('data-test-'));

    if (testAttribute) {
      return `[${testAttribute.name}="${testAttribute.value}"]`;
    }

    const testSelectors = new Set(['selector', 'title', 'section', 'action', 'id', 'modal', 'input', 'button']);
    let closestSelector = null;
    let minDepth = Infinity;

    for (const selectorName of testSelectors) {
      const dataTestAttr = `data-test-${selectorName}`;
      const matchingElement = element.closest(`[${dataTestAttr}]`);

      if (matchingElement) {
        let depth = 0;
        let current = element;

        while (current && current !== matchingElement) {
          depth++;
          current = current.parentElement;
        }

        if (depth < minDepth) {
          minDepth = depth;
          closestSelector = `[${dataTestAttr}="${matchingElement.getAttribute(dataTestAttr)}"]`;
        }
      }
    }

    return closestSelector || false;
  }
}
