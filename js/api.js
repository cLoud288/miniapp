import { config } from './config.js';

export async function analyzeNiche({ platform, query, initData }) {
  const res = await fetch(`${config.API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Init-Data': initData,
    },
    body: JSON.stringify({ platform, query }),
  });

  if (!res.ok) {
    throw new Error('Ошибка анализа');
  }

  return res.json();
}

export async function checkSubscription(initData) {
  if (!initData) {
    throw new Error('Приложение должно быть открыто из Telegram');
  }

  const res = await fetch(`${config.API_BASE_URL}/billing/subscription`, {
    headers: {
      'X-Init-Data': initData,
    },
  });

  if (!res.ok) {
    throw new Error('Ошибка авторизации');
  }

  return res.json();
}

export async function createInvoice(initData) {
  const res = await fetch(`${config.API_BASE_URL}/billing/invoice`, {
    method: 'POST',
    headers: {
      'X-Init-Data': initData,
    },
  });

  return res.json();
}