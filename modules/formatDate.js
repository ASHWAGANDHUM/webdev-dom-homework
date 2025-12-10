export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const localized = date.toLocaleString('ru-RU', options);

  const [d, t] = localized.replace(',', '').split(' ');
  const [day, month, year] = d.split('.');

  return `${day}.${month}.${year} ${t}`;
}