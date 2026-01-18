alert("APP VERSION 999");
import { state } from "./state.js";
import { navigate } from "./router.js";

const tg = window.Telegram.WebApp;

// обязательные вызовы
tg.ready();
tg.expand();

/**
 * ВАЖНО:
 * tg.initData МОЖЕТ БЫТЬ пустой строкой — это НОРМА
 * Единственный надёжный признак Telegram-контекста — initDataUnsafe.user
 */
if (!tg.initDataUnsafe || !tg.initDataUnsafe.user) {
  document.getElementById("app").innerHTML = `
    <div class="container">
      <h2>Откройте приложение из Telegram</h2>
      <p>Mini App должен быть открыт через кнопку меню бота.</p>
    </div>
  `;
  throw new Error("Telegram WebApp context not found");
}

// сохраняем Telegram-данные в state
state.user = tg.initDataUnsafe.user;
state.initData = tg.initData; // может быть "", это допустимо

// стартовый экран
navigate(state.route);