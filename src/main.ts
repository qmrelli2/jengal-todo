import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Jengal Todo',
    redirectTo: 'list/all',
    pathMatch: 'full',
  },
  {
    path: 'list',
    title: 'Jengal Todo',
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./app/pages/list/list.page').then((m) => m.ListPage),
      },
    ],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./app/pages/search/search.page').then((m) => m.SearchPage),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot(routes)),
  ],
}).catch((err) => console.log(err));
