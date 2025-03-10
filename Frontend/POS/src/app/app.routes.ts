import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login Page Route
  { path: 'register', component: RegisterComponent }, // Register Page Route
  { path : 'product' , component:ProductsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to Login Page
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Wildcard route to catch unknown paths
];

