import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  clickCount =0 

  isDropdownVisible: boolean =false;


  cartClick(): void {
    this.clickCount++;
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

  productClick(): void {
    this.router.navigate(['/product']);
  }

  cartRemove(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }
}
