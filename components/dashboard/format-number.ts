const numberFormatter = new Intl.NumberFormat("vi-VN");

export function formatDashboardNumber(value: number) {
  return numberFormatter.format(value);
}
