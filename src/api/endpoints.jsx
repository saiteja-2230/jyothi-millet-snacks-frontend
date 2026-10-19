const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  products: `${BASE_URL}/products`,
  notifications: `${BASE_URL}/notifications`,
  bestsellers: `${BASE_URL}/bestsellers`,
  faq: `${BASE_URL}/faq`,
  products: `${BASE_URL}/products`,
  register : `${BASE_URL}/register`,
  login : `${BASE_URL}/login`,
  categories: `${BASE_URL}/categories`,
  // products:`${BASE_URL}/products/category/{slug}`
  productsByCategory: (slug) =>
    `${BASE_URL}/products/category/${slug}`,
    bestseller: `${BASE_URL}/products/best-sellers`

};