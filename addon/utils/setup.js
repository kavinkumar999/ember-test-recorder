const TEST_ACTIONS = {
  CLICK: 'click',
  INPUT: 'input',
  FOCUS: 'focus',
  BLUR: 'blur',
  KEYUP: 'keyup',
  SUBMIT: 'submit'
};

export function setupAllEvents(context, owner) {
  const testCaseGenerator = owner.lookup('service:test-case-generator');

  setupClickEvents(testCaseGenerator);
  setupInputEvents(testCaseGenerator);
  setupFocusEvents(testCaseGenerator);
  setupFormEvents(testCaseGenerator);
}

function setupClickEvents(testCaseGenerator) {
  document.body.addEventListener(TEST_ACTIONS.CLICK, (event) => {
    const element = event.target;
    let notAllowedClasses = ['test-action-button', 'recorder-button', 'close-button'];
    let closestElementList = ['.test-recorder-sidebar'];
    let classAllowedCondition = notAllowedClasses.some((className) => element.classList.contains(className));
    let closestElementAllowedCondition = closestElementList.some((className) => {
      if (element.closest(className)) {
        return true;
      }
    });

    if (
      !testCaseGenerator.isRecording ||
      !element ||
      element.matches('input[type="text"]', 'textarea') ||
      classAllowedCondition ||
      closestElementAllowedCondition
    ) {
      return;
    }

    const selector = generateSelector(element);
    testCaseGenerator.addStep({
      action: 'click',
      selector,
      element: element.outerHTML
    });
  });
}

function setupInputEvents(testCaseGenerator) {
  document.body.addEventListener(TEST_ACTIONS.INPUT, (event) => {
    const element = event.target;
    if (!testCaseGenerator.isRecording || !element || !element.matches('input, textarea, select')) {
      return;
    }

    const selector = generateSelector(element);
    const action = element.type === 'text' || element.type === 'textarea' ? 'typeIn' : 'fillIn';

    testCaseGenerator.addStep({
      action,
      selector,
      value: element.value,
      element: element.outerHTML
    });
  });

  document.body.addEventListener(TEST_ACTIONS.BLUR, (event) => {
    const element = event.target;
    if (!testCaseGenerator.isRecording || !element || !element.matches('input, textarea, select')) {
      return;
    }

    testCaseGenerator.addStep({
      action: 'blur',
      selector: generateSelector(element),
      element: element.outerHTML
    });
  });
}

function setupFocusEvents(testCaseGenerator) {
  document.body.addEventListener(TEST_ACTIONS.FOCUS, (event) => {
    const element = event.target;
    if (!testCaseGenerator.isRecording || !element || !element.matches('input, textarea, select')) {
      return;
    }

    testCaseGenerator.addStep({
      action: 'focus',
      selector: generateSelector(element),
      element: element.outerHTML
    });
  });
}

function setupFormEvents(testCaseGenerator) {
  document.body.addEventListener(TEST_ACTIONS.SUBMIT, (event) => {
    const form = event.target;
    if (!testCaseGenerator.isRecording || !form || !form.matches('form')) {
      return;
    }

    testCaseGenerator.addStep({
      action: 'triggerEvent',
      selector: generateSelector(form),
      eventName: 'submit',
      element: form.outerHTML
    });
  });
}

function generateSelector(element) {
  const testSelector = Array.from(element.attributes).find((attr) => attr.name.startsWith('data-test-'));

  if (element.id) {
    return `#${element.id}`;
  }

  if (testSelector) {
    return `[${testSelector.name}]`;
  }

  if (element.className) {
    const classes = element.className.split(' ').filter(Boolean);
    if (classes.length) {
      return `.${classes[0]}`;
    }
  }

  return element.tagName.toLowerCase();
}
