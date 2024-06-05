import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', { static: true }) nameRef?: ElementRef;
  @ViewChild('amountInput', { static: true }) amountRef?: ElementRef;

  @Output() IngredientAdded = new EventEmitter<Ingredients>();

  onAddIngredientItem() {
    const ingredient = new Ingredients(
      this.nameRef?.nativeElement.value,
      this.amountRef?.nativeElement.value
    );

    this.IngredientAdded.emit(ingredient);
    // this.ingredients.push(ingredient);
  }
}
