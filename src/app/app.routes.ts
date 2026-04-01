import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { FindOutMore } from './pages/homepage/findOutMore';
import { Dashboard } from './pages/homepage/dashboards/dashboard';
import { DashboardOverview } from './pages/homepage/dashboards/dashboard-overview';
import { SupplierForm } from './pages/homepage/supplier/supplier-form';
import { SupplierList } from './pages/homepage/supplier/supplier-list';
import { ProductList } from './pages/product/product-list';
import { DriverListComponent } from './pages/driver/driver-list';
import { DriverFormComponent } from './pages/driver/driver-form';

export const routes: Routes = [
  {
    path: '',
    component: Homepage,
  },

  {
    path: 'about',
    component: FindOutMore,
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '',               component: DashboardOverview },
      { path: 'suppliers/new',  component: SupplierForm },
      { path: 'suppliers',      component: SupplierList },
      { path: 'products',       component: ProductList },
      { path: 'drivers', component: DriverListComponent },
      { path: 'drivers/new', component: DriverFormComponent },
      { path: 'drivers/edit/:id', component: DriverFormComponent },

    ],
  },
];