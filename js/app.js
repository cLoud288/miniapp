import { state } from './state.js';
import { navigate } from './router.js';

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

console.log('initData:', tg.initData);
console.log('initDataUnsafe:', tg.initDataUnsafe);  

state.user = tg.initDataUnsafe?.user || null;
state.initData = tg.initData || null;

navigate(state.route);