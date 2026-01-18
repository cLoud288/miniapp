import { config } from "./config.js";

/**
 * Проверка подписки
 * НИКАКИХ проверок формата строки initData
 * Просто передаём как есть
 */
async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response:", text);
    throw new Error("Backend returned invalid response");
  }
}

export async function checkSubscription(initData) {
  const res = await fetch(`${config.API_BASE_URL}/billing/subscription`, {
    headers: {
      "X-Init-Data": initData || "",
    },
  });

  if (!res.ok) {
    throw new Error("Subscription check failed");
  }

  return safeJson(res);
}

export async function analyzeNiche({ platform, query, initData }) {
  const res = await fetch(`${config.API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Init-Data": initData || "",
    },
    body: JSON.stringify({ platform, query }),
  });

  if (!res.ok) {
    throw new Error("Analyze request failed");
  }

  return safeJson(res);
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