export function setupAllEvents() {
  setupClickEvent();
  setupInputEvent();
}

function setupClickEvent() {
  document.body.addEventListener('click', (event) => {
    console.log('click', event);
  });
}

function setupInputEvent() {
  document.body.addEventListener('input', (event) => {
    console.log('input', event);
  });
}
