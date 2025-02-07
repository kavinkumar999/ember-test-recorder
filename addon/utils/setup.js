import EventAdapter from './event-handlers';
import { TEST_ACTIONS } from '../constants/events';

export function setupAllEvents(context, owner) {
  const testCaseGenerator = owner.lookup('service:test-case-generator');
  const eventManager = owner.lookup('service:event-manager');
  const eventAdapter = new EventAdapter(testCaseGenerator, eventManager);

  const eventHandlers = {
    [TEST_ACTIONS.CLICK]: (event) => eventAdapter.handleClick(event),
    [TEST_ACTIONS.INPUT]: (event) => eventAdapter.handleInput(event),
    [TEST_ACTIONS.FOCUS]: (event) => eventAdapter.handleFocus(event),
    [TEST_ACTIONS.BLUR]: (event) => eventAdapter.handleBlur(event),
    [TEST_ACTIONS.SUBMIT]: (event) => eventAdapter.handleSubmit(event),
    [TEST_ACTIONS.POPSTATE]: (event) => eventAdapter.handlePopState(event)
  };

  Object.entries(eventHandlers).forEach(([eventType, handler]) => {
    if (eventType === TEST_ACTIONS.POPSTATE) {
      window.addEventListener(eventType, handler);
    } else {
      document.body.addEventListener(eventType, handler);
    }
  });

  return () => {
    Object.entries(eventHandlers).forEach(([eventType, handler]) => {
      if (eventType === TEST_ACTIONS.POPSTATE) {
        window.removeEventListener(eventType, handler);
      } else {
        document.body.removeEventListener(eventType, handler);
      }
    });
  };
}
