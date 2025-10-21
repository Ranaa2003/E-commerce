import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductsComponent } from './features/products/products.component';
import { DetailsComponent } from './features/details/details.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { AllordersComponent } from './features/allorders/allorders.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ForgetpasswordComponent } from './core/auth/forgetpassword/forgetpassword.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
      {
        path: 'forgetPassword',
        component: ForgetpasswordComponent,
        title: 'ForgetPassword Page',
      },
    ],
    canActivate: [isLoggedGuard],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home Page' },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c)=>c.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products Page',
      },
      {
        path: 'details/:slug/:id',
        component: DetailsComponent,
        title: 'Details Page',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page',
      },
     
      {
        path: 'checkout/:id',
        component: CheckoutComponent,
        title: 'CheckOut Page',
      },
      {
        path: 'allorders',
        component: AllordersComponent,
        title: 'Allorders Page',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories Page',
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'Wishlist Page',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Page',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About Page',
      },
    ],
    canActivate: [authGuard],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound Page' },
];
