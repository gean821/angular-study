import { Routes } from '@angular/router';
import { Homepage } from './pages/homepage/homepage';
import { FindOutMore } from './pages/homepage/findOutMore';

export const routes: Routes = [
  {
    path: '', 
    component: Homepage
  },

  {
    path: 'about',
    component: FindOutMore
  }
];