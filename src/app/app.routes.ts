import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ck',
    loadComponent: () => import('./components/ck-editor/ck-editor.component')
  },
  {
    path: 'editor',
    loadComponent: () => import('./components/editorjs/editorjs.component')
  },
  {
    path: 'quill',
    loadComponent: () => import('./components/quill/quill.component')
  },
  {
    path: 'exemplo',
    loadComponent: () => import('./components/exemplo/exemplo.component')
  }
];
