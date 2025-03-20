
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Use CommonModule here
import { AuthserviceService } from '../../services/authservice/authservice.service';
import { log } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean | undefined;

  email:string='';
  password:string='';

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private authService: AuthserviceService

  ) {
    this.loginForm = this.fb.group({
     
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  

  onSubmit(): void {
    if (this.loginForm.valid) {

      this.email =this.loginForm.get('email')?.value;
      this.password = this.loginForm.get('password')?.value;

      console.log(this.email);
      console.log(this.password);
      
      

      this.isSubmitting = true; // Add this flag to your component
      const { email, password } = this.loginForm.value;
  
      this.authService.login({ email, password }).subscribe({
        next: (response) => {
          
          console.log('Login Successful:', response);
          this.router.navigate(['/product']);
          localStorage.setItem('user', JSON.stringify(response.user));
          console.log('localStorage.getItem ',localStorage.getItem('user'))
        },
        error: (error) => {
          console.error('Login Failed:', error);
          const message = error.status === 401
            ? 'Unauthorized: Invalid email or password.'
            : 'Unexpected error occurred. Please try again.';
          alert(message);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
      
    } else {
      console.log('Form is invalid');
    }
  }
}
  
        // error: (error) => {
        //   console.error('Login Failed:', error);
        //   console.log(error);
        //   alert('Invalid credentials. Please try again!');
        // },
