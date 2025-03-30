# Test Case Generator

An Ember.js addon that helps you create tests by recording user interactions in your application. This tool automatically generates test cases based on your actions, making test creation more intuitive and efficient.

## Compatibility

- Ember.js v4.12 or above
- Ember CLI v4.12 or above
- Node.js v18 or above

## Installation

```bash
ember install test-case-generator
```

## Usage

### Basic Setup

Add the test recorder to your application by importing and using the provided components:

```handlebars
{{!-- application.hbs --}}
<TestCaseRecorder />
```

### Recording Tests

1. Click the "Start Recording" button in the sidebar
2. Perform the actions you want to test in your application
3. Use the assertion Mode to add assertions about the page state
4. Click "Stop Recording" when finished
5. Copy the generated test code to your test file

### Event Configuration

The test recorder provides a flexible event management system that allows you to control which events are tracked during test recording:

1. Click the "Events Config" tab in the sidebar
2. Toggle individual events on/off:
   - Click Events - Track mouse clicks on elements
   - Input Events - Track form input changes
   - Form Submit - Track form submissions
   - Navigation - Track route changes

Events can be enabled/disabled at any time, even during recording. This helps you:
- Focus on specific interactions you want to test
- Reduce noise in generated test cases
- Create more targeted and maintainable tests

### Features

- 🎥 Records user interactions (clicks, form inputs, etc.)
- ✅ Generates assertions based on page state
- 🔄 Converts recorded actions into readable test code
- 📝 Supports custom assertions through the assertion panel
- 🎯 Automatically tracks DOM events and route transitions
- ⚙️ Configurable event tracking system

### Example Generated Test

```javascript
test('user can complete login flow', async function(assert) {
  await visit('/login');
  await fillIn('[data-test-email]', 'user@example.com');
  await fillIn('[data-test-password]', 'password123');
  await click('[data-test-submit]');
  
  assert.dom('[data-test-welcome]').hasText('Welcome back!');
});
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

### Local Development

1. Clone the repository
2. `npm install`
3. `ember serve`
4. Visit the dummy app at http://localhost:4200

## License

This project is licensed under the [MIT License](LICENSE.md).
