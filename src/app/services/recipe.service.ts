import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Test recipe 1',
      'This is test 1 description for recipe',
      '/assets/images/recipe.jpg',
      [
        new Ingredients('ing1', 100),
        new Ingredients('ing2', 160),
      ]
    ),
    new Recipe(
      'Test recipe 2',
      'This is test 2 description for recipe',
      '/assets/images/recipe.jpg',
      [
        new Ingredients('ing4', 100),
        new Ingredients('ing5', 160),
      ]
    ),
    new Recipe(
      'Test recipe 3',
      'This is test 3 description for recipe',
      '/assets/images/recipe.jpg',
      [
        new Ingredients('ing7', 100),
        new Ingredients('ing8', 160),
      ]
    ),
  ];

  recipeSelected = new Subject<Recipe>();

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  getRecipes() {
    return this.recipes;
  }

  addIngredientToShoppingList(ingredient: Ingredients[] | undefined) {
    if(ingredient) {
      this.shoppingListService.addIngredients(ingredient);
    }
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }
}
