import { fetchJson } from '../lib/fetch-json';

const baseUrl = 'https://ecomm-service.fly.dev/product';

export type ProductComment = {
  _id: string;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  _id: string;
  name: string;
  price: string;
  descriptions: Array<string>;
  related: Array<string>;
  images?: {
    standard: string;
    webp: string;
    thumbStandard: string;
    thumbWebp: string;
    blur: string;
    thumbBlur: string;
  };
  comments: Array<ProductComment>;
};

export const getProducts = (options?: RequestInit) =>
  fetchJson<Product[]>(`${baseUrl}?limit=12`, options);

export const getOneProduct = (productId: string, options?: RequestInit) =>
  fetchJson<Product>(`${baseUrl}/${productId}`, options);
