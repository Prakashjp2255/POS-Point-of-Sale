import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login Page Route
  { path : 'product' , component:ProductsComponent},
  { path: 'profile' , component:ProfileComponent }, 
  { path : 'header' , component:HeaderComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default to login page
  { path: '**', redirectTo: '/login' } // Catch-all route
];

