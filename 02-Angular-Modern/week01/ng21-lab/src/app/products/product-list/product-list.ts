import { Component, computed, signal } from '@angular/core';
import { Category, Product, PRODUCTS } from '../product.model';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

  products = signal<Product[]>(PRODUCTS);
  searchTerm = signal<string>('');
  category = signal<Category | 'all'>('all');

  filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const cat = this.category();
    return this.products().filter(p => p.name.toLocaleLowerCase().includes(term) && (cat === 'all' || p.category === cat));
  });

  clearFilters() {
    this.searchTerm.set('');
    this.category.set('all');
  }

  setCategory(category: Category | 'all') {
    this.category.set(category);
  }

  shuffleList(){
    this.products.update(list => [...list].sort(() => Math.random() - 0.5));
  }
}
