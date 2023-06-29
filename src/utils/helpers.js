export const formatPrice = (num) => {
  const price = new Intl.NumberFormat('eu-lt', {
    style: 'currency',
    currency: 'eur',
  }).format(num / 100);
  return price;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === 'colors') {
    unique = unique.flat(unique.length);
  }
  return ['all', ...new Set(unique)];
};
