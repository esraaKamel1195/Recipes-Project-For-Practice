import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: true }) nameRef?: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRef?: ElementRef;


  constructor(private shoppingListServ: ShoppingListService) {}

  onAddIngredientItem() {
    const ingredient = new Ingredients(
      this.nameRef?.nativeElement.value,
      this.amountRef?.nativeElement.value
    );

    this.shoppingListServ.addIngredient(ingredient);
  }
}
