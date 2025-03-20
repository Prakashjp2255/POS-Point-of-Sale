import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true, // Standalone component
  imports: [CommonModule], // Import CommonModule for Angular directives like *ngIf
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: { name?: string; authToken?: string; email?: string; password?: string } | null = null; // Explicit type for userProfile

  constructor() {}

  ngOnInit(): void {
    console.log("Before navigation, checking authToken...");

    // Check if localStorage is available
    if (typeof window !== 'undefined' && localStorage) {
      const authToken = localStorage.getItem('authToken'); // Retrieve authToken safely

      if (authToken) {
        // Simulating the presence of additional data
        this.userProfile = { authToken, name: 'John Doe' }; // Adding a sample name for better usability
        console.log("User data found and set in userProfile:", this.userProfile);
      } else {
        console.log("User data not found. Redirecting to login...");
        // Ideally, navigate to the login page if user data is missing
        // For example, using Angular Router: this.router.navigate(['/login']);
      }
    } else {
      console.error("localStorage is not available.");
    }

    console.log("Final userProfile:", this.userProfile);
  }
}
