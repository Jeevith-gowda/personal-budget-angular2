import { Routes } from '@angular/router';
import { About } from './about/about';
import { Homepage } from './homepage/homepage';
import { Login } from './login/login';
import { P404 } from './p404/p404';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Homepage, pathMatch: 'full' },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'p404', component: P404 },      // Add the p404 path
  { path: '**', redirectTo: 'p404' }      // Redirect to the path string, not component
];
