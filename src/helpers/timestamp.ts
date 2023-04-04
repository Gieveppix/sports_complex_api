function getCurrentTimestamp(): string {
  const date = new Date();
  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? '+' : '-';
  const pad = (number: number) => String(number).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based in JavaScript
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  const millisecond = String(date.getMilliseconds()).padStart(3, '0');
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
  const offsetMinutes = pad(Math.abs(offset) % 60);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond} ${offsetSign}${offsetHours}${offsetMinutes}`;
}

export { getCurrentTimestamp };
