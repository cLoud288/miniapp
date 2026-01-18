import { render, renderLoader, renderError } from "../ui.js";
import { state } from "../state.js";
import { checkSubscription, analyzeNiche } from "../api.js";
import { navigate } from "../router.js";

export function showForm() {
  render(`
    <div class="container">
      <h1>Анализ ниши</h1>

      <form id="niche-form" novalidate>
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
          <input
            id="query"
            type="text"
            placeholder="iPhone 13"
            autocomplete="off"
          />
        </label>

        <button type="submit">Проверить</button>
      </form>
    </div>
  `);

  const form = document.getElementById("niche-form");
  form.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
  e.preventDefault(); // 🔥 КРИТИЧНО

  try {
    const platform = document.getElementById("platform").value;
    const query = document.getElementById("query").value.trim();

    if (!platform || !query) {
      renderError("Заполните все поля");
      return;
    }

    renderLoader();

    const sub = await checkSubscription(state.initData);
    state.isPaid = sub.active;

    state.report = await analyzeNiche({
      platform,
      query,
      initData: state.initData,
    });

    state.route = "report";
    navigate("report");
  } catch (err) {
    renderError(err.message || "Ошибка");
  }
}