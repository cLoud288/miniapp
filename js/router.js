import { showForm } from './screens/form.js';
import { showReport } from './screens/report.js';
import { showPaywall } from './screens/paywall.js';

const routes = {
  form: showForm,
  report: showReport,
  paywall: showPaywall,
};

export function navigate(route) {
  if (!routes[route]) {
    throw new Error(`Unknown route: ${route}`);
  }

  routes[route]();
}