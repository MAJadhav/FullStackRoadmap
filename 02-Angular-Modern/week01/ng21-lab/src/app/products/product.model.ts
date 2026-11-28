export type StockStatus = 'in-stock' | 'low' | 'out';
export type Category = 'supplements' | 'equipment' | 'apparel';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  discountPrice?: number;
  stock: StockStatus;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Whey Protein 1kg',   category: 'supplements', price: 2499, discountPrice: 1999, stock: 'in-stock' },
  { id: 2, name: 'Creatine 250g',      category: 'supplements', price: 899,  stock: 'low' },
  { id: 3, name: 'Adjustable Dumbbell',category: 'equipment',   price: 5999, stock: 'in-stock' },
  { id: 4, name: 'Yoga Mat',           category: 'equipment',   price: 799,  discountPrice: 599, stock: 'out' },
  { id: 5, name: 'Resistance Bands',   category: 'equipment',   price: 499,  stock: 'low' },
  { id: 6, name: 'Gym T-Shirt',        category: 'apparel',     price: 699,  stock: 'in-stock' },
  { id: 7, name: 'Training Shoes',     category: 'apparel',     price: 3499, discountPrice: 2799, stock: 'in-stock' },
  { id: 8, name: 'BCAA 300g',          category: 'supplements', price: 1299, stock: 'out' },
];