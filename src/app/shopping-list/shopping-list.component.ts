import {
  Component,
  OnInit
} from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredients [] = [];

  constructor(private shoppingList: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingList.getIngredients();
  }

}
