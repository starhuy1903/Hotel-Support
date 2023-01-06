export const priceFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format;
export const percentageFormatter = new Intl.NumberFormat('vi-VN', { style: 'percent' }).format;
export const timeFormatter = (time) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(time));
}