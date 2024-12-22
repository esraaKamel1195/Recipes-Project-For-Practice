import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from './auth/can-activate.guard';
import { canActivateChildGuard } from './auth/can-activate-child.guard';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    canActivate: [canActivateGuard],
    canActivateChild: [canActivateChildGuard],
    loadChildren: () =>
      import('./recipes/recipes/recipes.module').then(
        (mod) => mod.RecipesModule
      ),
  },
  {
    path: 'shopping-list',
    canActivate: [canActivateGuard],
    loadChildren: () =>
      import('./shopping-list/shopping-list/shopping-list.module').then(
        (mod) => mod.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((mod) => mod.AuthModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
