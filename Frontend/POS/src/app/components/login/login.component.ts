// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule,
//     RouterModule,
//     CommonModule,
//     HttpClientModule, // Ensure HttpClientModule is imported here
//   ],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.loginForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;

//       this.authService.login({ email, password }).subscribe({
//         next: (response) => {
//           console.log('Login Successful:', response);
//           this.router.navigate(['/product']);
//         },
//         error: (error) => {
//           console.error('Login Failed:', error);
//           alert('Invalid credentials. Please try again!');
//         },
//       });
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Use CommonModule here
import { AuthService } from '../../services/authservice/authservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // Replacing BrowserModule with CommonModule
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          console.log('Login Successful:', response);
          this.router.navigate(['/product']);
        },
        error: (error) => {
          console.error('Login Failed:', error);
          alert('Invalid credentials. Please try again!');
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
