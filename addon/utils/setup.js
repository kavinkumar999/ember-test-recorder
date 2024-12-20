import EventAdapter from './event-handlers';

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
  const eventAdapter = new EventAdapter(testCaseGenerator);

  const eventHandlers = {
    [TEST_ACTIONS.CLICK]: (event) => eventAdapter.handleClick(event),
    [TEST_ACTIONS.INPUT]: (event) => eventAdapter.handleInput(event),
    [TEST_ACTIONS.FOCUS]: (event) => eventAdapter.handleFocus(event),
    [TEST_ACTIONS.BLUR]: (event) => eventAdapter.handleBlur(event),
    [TEST_ACTIONS.SUBMIT]: (event) => eventAdapter.handleSubmit(event)
  };

  Object.entries(eventHandlers).forEach(([eventType, handler]) => {
    document.body.addEventListener(eventType, handler);
  });

  return () => {
    Object.entries(eventHandlers).forEach(([eventType, handler]) => {
      document.body.removeEventListener(eventType, handler);
    });
  };
}
