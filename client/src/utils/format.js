export function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

// Aceita "1.234,56", "1234,56" e "1234.56".
export function parseValor(str) {
  const s = String(str).trim();
  const normalizado = s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s;
  return parseFloat(normalizado);
}

export function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
