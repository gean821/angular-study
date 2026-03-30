import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { FindOutMore } from './pages/homepage/findOutMore';
import { Dashboard } from './pages/homepage/dashboards/dashboard';
import { DashboardOverview } from './pages/homepage/dashboards/dashboard-overview';
import { SupplierForm } from './pages/homepage/supplier/supplier-form';
import { SupplierList } from './pages/homepage/supplier/supplier-list';

export const routes: Routes = [
  {
    path: '', 
    component: Homepage
  },

  {
    path: 'about',
    component: FindOutMore
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '',              component: DashboardOverview },
      { path: 'suppliers/new', component: SupplierForm },
      { path: 'suppliers',     component: SupplierList },
    ],
  },
];