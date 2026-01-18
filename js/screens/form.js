import { render, renderLoader, renderError } from '../ui.js';
import { state } from '../state.js';
import { analyzeNiche, checkSubscription } from '../api.js';
import { navigate } from '../router.js';

export function showForm() {
  render(`
    <div class="container">
      <h1>Анализ ниши</h1>

      <label>
        Площадка
        <select id="platform">
          <option value="">Выберите</option>
          <option value="avito">Avito</option>
          <option value="ozon">Ozon</option>
          <option value="wb">Wildberries</option>
        </select>
      </label>

      <label>
        Запрос
        <input id="query" placeholder="iPhone 13" />
      </label>

      <button id="submit">Проверить</button>
    </div>
  `);

  document.getElementById('submit').onclick = submit;
}

async function submit() {
  try {
    state.platform = document.getElementById('platform').value;
    state.query = document.getElementById('query').value;

    if (!state.platform || !state.query) {
      throw new Error('Заполните все поля');
    }

    renderLoader();

    const sub = await checkSubscription(state.initData);
    state.isPaid = sub.active;

    state.report = await analyzeNiche({
      platform: state.platform,
      query: state.query,
      initData: state.initData,
    });

    state.route = 'report';
    navigate('report');

  } catch (e) {
    renderError(e.message);
  }
}