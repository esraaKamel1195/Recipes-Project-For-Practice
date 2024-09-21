import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredients } from '../../shared/ingredients.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  shoppingList: Subscription = new Subscription();
  editedIndex?: number;
  editedItem?: Ingredients;
  @ViewChild('shoppingForm', { static: true }) shoppingListForm?: NgForm;

  constructor(private shoppingListServ: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListServ.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingListServ.getIngredientByIndex(index);
        this.shoppingListForm?.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddItem(shoppingForm: NgForm) {
    const ingredient = new Ingredients(
      shoppingForm.value.name,
      shoppingForm.value.amount
    );

    if(this.editMode) {
      this.shoppingListServ.updateIngredient(this.editedIndex, ingredient);
    } else {
      this.shoppingListServ.addIngredient(ingredient);
    }

    this.editMode = false;
    shoppingForm.reset();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListServ.deleteIngredient(this.editedIndex);
    }
  }

  onClear() {
    this.shoppingListForm?.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.shoppingList.unsubscribe();
  }
}
