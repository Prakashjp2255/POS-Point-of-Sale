import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isDropdownVisible: boolean = true;
  clickCount: number = 0;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isDropdownVisible = false;
    }
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onClick(): void {
    this.router.navigate(['/profile']);
  }

  cartClick(): void {
    this.clickCount++;
  }

  cartRemove(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  private getAllProducts(): void {
    this.isLoading = true;
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (token) {
      this.productService.getProducts(token).subscribe({
        next: (response) => {
          console.log('Products:', response);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch products:', err);
          this.error = 'Failed to fetch products. Please try again later.';
          this.isLoading = false;
        },
      });
    } else {
      console.error('No token found. Please log in.');
      this.error = 'No token found. Please log in.';
      this.isLoading = false;
    }
  }
}
