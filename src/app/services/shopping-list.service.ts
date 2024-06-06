import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredients [] = [
    new Ingredients('Apple', 100),
    new Ingredients('Pizza', 150),
    new Ingredients('Mango', 60),
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
  }
}
