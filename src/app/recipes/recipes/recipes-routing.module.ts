import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard } from '../../auth/can-activate.guard';
import { canActivateChildGuard } from '../../auth/can-activate-child.guard';
import { RecipesComponent } from '../recipes.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';

const routes: Routes = [
  {
      path: '',
      canActivate: [canActivateGuard],
      component: RecipesComponent,
      children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailsComponent },
        { path: ':id/edit', component: RecipeEditComponent }
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
