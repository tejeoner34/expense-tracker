export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
