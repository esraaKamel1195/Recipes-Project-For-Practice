import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  startedEditing: Subject<number> = new Subject<number>();
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

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number = 0, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;
  }

  deleteIngredient(index: number = 0) {
    this.ingredients.splice(index, 1);
  }
}
