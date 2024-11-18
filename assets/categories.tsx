import { Category } from './types/category';
import { PRODUCTS } from './products';
export const CATEGORIES: Category[] = [
  {
    name: 'Retail',
    slug: 'retail',
    imageUrl:
      'https://i.ibb.co/RjBRVn2/c1.png',
    products: PRODUCTS.filter(product => product.category.slug === 'Retail'),
  },
  {
    name: 'Cheap combo',
    slug: 'cheap combo',
    imageUrl:
      'https://i.ibb.co/TkWj0wc/c2.png',
    products: PRODUCTS.filter(product => product.category.slug === 'Cheap combo'),
  },
  {
    name: 'True Juice',
    slug: 'true juice',
    imageUrl:
      'https://i.ibb.co/LRjxHQK/c3.png',
    products: PRODUCTS.filter(product => product.category.slug === 'True Juice'),
  },
  {
    name: 'Lunch Snacks',
    slug: 'Lunch snacks',
    imageUrl:
      'https://i.ibb.co/RjBRVn2/c1.png',
    products: PRODUCTS.filter(
      product => product.category.slug === 'accessories'
    ),
  },
];