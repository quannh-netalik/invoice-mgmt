export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(date);
};
