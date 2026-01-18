import { state } from './state.js';

export function render(html) {
  document.getElementById('app').innerHTML = html;
}

export function renderLoader() {
  render(`
    <div class="container">
      <div class="loader">Анализируем нишу…</div>
    </div>
  `);
}

export function renderError(message) {
  render(`
    <div class="container">
      <div class="error">${message}</div>
    </div>
  `);
}