import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];

  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes;
  }

  addIngredientToShoppingList(ingredient: Ingredients[] | undefined) {
    if (ingredient) {
      this.shoppingListService.addIngredients(ingredient);
    }
  }

  getRecipeById(id: number): Recipe {
    return this.recipes[id];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes);
  }
}
