import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Array<Recipe> = [];

  constructor(
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
}
