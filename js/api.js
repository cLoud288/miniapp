import { config } from "./config.js";

/**
 * Проверка подписки
 * НИКАКИХ проверок формата строки initData
 * Просто передаём как есть
 */
export async function checkSubscription(initData) {
  const res = await fetch(`${config.API_BASE_URL}/billing/subscription`, {
    method: "GET",
    headers: {
      "X-Init-Data": initData || "",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка проверки подписки");
  }

  return res.json();
}

/**
 * Анализ ниши
 */
export async function analyzeNiche({ platform, query, initData }) {
  const res = await fetch(`${config.API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Init-Data": initData || "",
    },
    body: JSON.stringify({
      platform,
      query,
    }),
  });

  if (!res.ok) {
    throw new Error("Ошибка анализа ниши");
  }

  return res.json();
}

/**
 * Создание инвойса (paywall)
 */
export async function createInvoice(initData) {
  const res = await fetch(`${config.API_BASE_URL}/billing/invoice`, {
    method: "POST",
    headers: {
      "X-Init-Data": initData || "",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка создания инвойса");
  }

  return res.json();
}