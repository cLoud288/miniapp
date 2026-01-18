import { render } from '../ui.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

export function showReport() {
  const r = state.report;

  render(`
    <div class="container">
      <h2>Отчёт</h2>

      Объявлений: ${r.ads}<br>
      Средняя цена: ${r.avgPrice} ₽<br>
      Конкуренция: ${r.competition}<br><br>

      ${
        state.isPaid
          ? full()
          : demo()
      }
    </div>
  `);
}

function demo() {
  return `
    <strong>Демо-доступ</strong><br>
    🔒 Полные данные<br><br>
    <button id="paywall">Открыть полный отчёт</button>
  `;
}

function full() {
  return `
    <strong>Полный доступ</strong><br>
    ✔ Топ продавцов<br>
    ✔ Индекс насыщенности
  `;
}

document.addEventListener('click', e => {
  if (e.target?.id === 'paywall') {
    state.route = 'paywall';
    navigate('paywall');
  }
});