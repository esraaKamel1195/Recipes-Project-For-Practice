import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe [] = [
    new Recipe('Test recipe 1', 'This is test 1 description for recipe', '/assets/images/recipe.jpg'),
    new Recipe('Test recipe 2', 'This is test 2 description for recipe', '/assets/images/recipe.jpg'),
    new Recipe('Test recipe 3', 'This is test 3 description for recipe', '/assets/images/recipe.jpg'),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
