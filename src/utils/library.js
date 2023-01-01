const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const generateLaterDate = (dateLater) => {
  return new Date(new Date().setDate(new Date().getDate() + dateLater));
};

export { formatCurrency, generateLaterDate };
