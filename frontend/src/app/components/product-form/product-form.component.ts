import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantityInStock: 0,
    category: ''
  };

  isEditMode = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getById(+id).subscribe({
        next: (data) => this.product = data,
        error: () => this.errorMessage = 'Не може да се вчита производот.'
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.product.id != null) {
      this.productService.update(this.product.id, this.product).subscribe({
        next: () => {
          this.successMessage = 'Производот е успешно уреден.';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.router.navigate(['/']);
        },
        error: () => this.errorMessage = 'Грешка при уредување.'
      });
    } else {
      this.productService.add(this.product).subscribe({
        next: () => {
          this.successMessage = 'Производот е успешно додаден.';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.router.navigate(['/']);
        },
        error: () => this.errorMessage = 'Грешка при додавање.'
      });
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.imageData = reader.result as string;
        console.log('Base64 image:', this.product.imageData?.substring(0, 100));
      };
      reader.readAsDataURL(file);
    }
  }


}
