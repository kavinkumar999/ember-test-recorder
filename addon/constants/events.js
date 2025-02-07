export const TEST_ACTIONS = {
  CLICK: 'click',
  INPUT: 'input',
  FOCUS: 'focus',
  BLUR: 'blur',
  KEYUP: 'keyup',
  SUBMIT: 'submit',
  POPSTATE: 'popstate'
};

export const SIDEBAR_EVENTS = [
  {
    id: TEST_ACTIONS.CLICK,
    name: 'Click Events',
    description: 'Track mouse clicks on elements',
    enabled: true
  },
  {
    id: TEST_ACTIONS.INPUT,
    name: 'Input Events',
    description: 'Track form input changes',
    enabled: true
  },
  {
    id: TEST_ACTIONS.SUBMIT,
    name: 'Form Submit',
    description: 'Track form submissions',
    enabled: true
  },
  {
    id: TEST_ACTIONS.POPSTATE,
    name: 'Navigation',
    description: 'Track route changes',
    enabled: true
  }
];
