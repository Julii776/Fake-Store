export const APP_ROUTES = {
  DASHBOARD: '/',
  PRODUCTS: '/products',
  PRODUCT: { getPath: (id: number) => `/products/${id}` },
};
