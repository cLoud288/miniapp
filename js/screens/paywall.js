import { render } from '../ui.js';
import { createInvoice } from '../api.js';

export function showPaywall() {
  render(`
    <div class="container">
      <h2>Полный отчёт</h2>

      <ul>
        <li>✔ Топ продавцов</li>
        <li>✔ Индекс насыщенности</li>
        <li>✔ Потенциал ниши</li>
      </ul>

      <button id="pay">Оплатить 299 ₽</button>
    </div>
  `);

  document.getElementById('pay').onclick = async () => {
    const invoice = await createInvoice();

    // В реале:
    // Telegram.WebApp.openInvoice(invoice.invoice_url)
    alert('Оплата (заглушка)');
  };
}