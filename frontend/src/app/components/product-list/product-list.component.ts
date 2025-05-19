import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  searchTerm = '';
  page = 0;
  pageSize = 5;
  totalItems = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.totalItems = data.length;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Не може да се вчитаат производите.';
        this.isLoading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (p.category?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
    );
  }

  get paginatedProducts(): Product[] {
    const filtered = this.filteredProducts;
    this.totalItems = filtered.length;
    const start = this.page * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  deleteProduct(id: number): void {
    if (confirm('Дали сте сигурни дека сакате да го избришете овој производ?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Производот е успешно избришан.';
          this.products = this.products.filter(p => p.id !== id);
        },
        error: () => {
          this.errorMessage = 'Грешка при бришење на производот.';
        }
      });
    }
  }
  onPageChange(newPage: number): void {
    this.page = newPage;
  }


  protected readonly Math = Math;
}
