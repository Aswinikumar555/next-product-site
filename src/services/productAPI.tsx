export const fetchProductsBySearch = async (val: string) => {
  const res = await fetch('/api/products?search=' + val);
  const data = await res.json();
  return data;
};
