import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  @Input() recipe?: Recipe;

  constructor(
    private recipeService: RecipeService
  ) {}

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe? this.recipe.ingredients: undefined);
  }
}
