import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      { path: '', title: 'Home Page', component: HomeComponent },
      {
        path: 'about',
        title: 'About Page',
        loadComponent: () =>
          import('./pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'contact',
        title: 'Contact Page',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
      },
      {
        path: 'cart',
        title: 'Cart Page',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'order',
        title: 'Order Page',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./pages/order/order.component').then((m) => m.OrderComponent),
      },
      {
        path: 'todo',
        title: 'Todo Page',
        loadComponent: () =>
          import('./pages/todo/todo.component').then((m) => m.TodoComponent),
      },

      {
        path: 'wishlist',
        title: 'wishlist Page',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'tags/:tagName',
        title: 'Tag Page',

        loadComponent: () =>
          import('./pages/tag/tag.component').then((m) => m.TagComponent),
      },
      {
        path: 'userreviews',
        title: 'userReviews Page',
        canActivate: [authGuard],

        loadComponent: () =>
          import('./pages/user-reviews/user-reviews.component').then(
            (m) => m.UserReviewsComponent
          ),
      },
      {
        path: 'categories/:categoryId',
        title: 'SubCategory Page',
        loadComponent: () =>
          import('./pages/subcategory/subcategory.component').then(
            (m) => m.SubcategoryComponent
          ),
      },
      {
        path: 'subcategories/:subcategoryId',
        title: 'Products Page',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'products/:productId',
        title: 'Product Page',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
    ],
  },

  {
    path: 'register',
    title: 'Register Page',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    title: 'Login Page',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'forgetPassword',
    title: 'forgetPassword Page',
    loadComponent: () =>
      import('./pages/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
  },
  {
    path: 'verifyResetCode',
    title: 'verifyResetCode Page',
    loadComponent: () =>
      import('./pages/verify-reset-code/verify-reset-code.component').then(
        (m) => m.VerifyResetCodeComponent
      ),
  },
  {
    path: 'resetPassword',
    title: 'resetPassword Page',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'userprofile',
    title: 'userProfile Page',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
  },
  {
    path: 'changepassword',
    title: 'changePassword Page',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
  },
  {
    path: 'updateprofile',
    title: 'updateProfile Page',
    loadComponent: () =>
      import('./pages/update-profile/update-profile.component').then(
        (m) => m.UpdateProfileComponent
      ),
  },
  {
    path: 'successpayment',
    title: 'successPayment Page',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/success-payment/success-payment.component').then(
        (m) => m.SuccessPaymentComponent
      ),
  },
  { path: '**', title: '404 Not Found Page', component: NotFoundComponent },
];

// ! with header and footer

// home;
// about;
// contact;
// product;
// cart;
// wishlist;
// order;
// subcategory;
// userreviews;

// ! without header and footer

// userprofile, changepassword, updateprofile;
// successpayment;
// register, login
