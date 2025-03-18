import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownVisible = false;
    }
  }

  isDropdownVisible = false;

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onClick() {
    this.router.navigate(['/profile']); // Navigate to the profile page
  }

  clickCount = 0;

  cartClick() {
    this.clickCount++;
  }

  cartRemove() {
    if (this.clickCount != 0) {
      this.clickCount--;
    }
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Products :', response);
      },
      error: (err) => {
        console.log('Fail Products :', err);
      },
    });
  }

  createProduct() {
    this.productService.createProduct().subscribe({
      next: (response) => {
        console.log('Products :', response);
      },
      error: (err) => {
        console.log('Fail Products :', err);
      },
    });
  }

  editProduct() {
    this.productService.editProduct().subscribe({
      next: (response) => {
        console.log('Products :', response);
      },
      error: (err) => {
        console.log('Fail Products :', err);
      },
    });
  }

  removeProduct() {
    this.productService.deletProduct().subscribe({
      next: (response) => {
        console.log('Products :', response);
      },
      error: (err) => {
        console.log('Fail Products :', err);
      },
    });
  }
}
