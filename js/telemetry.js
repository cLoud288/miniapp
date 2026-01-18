export function track(event, payload = {}) {
  console.log('[event]', event, payload);

  // позже:
  // fetch('/events', ...)
}