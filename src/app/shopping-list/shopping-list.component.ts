import {
  Component
} from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  
  ingredients: Ingredients[] = [
    new Ingredients('Apple', 100),
    new Ingredients('Pizza', 150),
    new Ingredients('Mango', 60),
  ];

  onIngredientAdded(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
  }
}
