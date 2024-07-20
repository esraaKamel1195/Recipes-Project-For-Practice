import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { BehaviorSubject, exhaustMap, map, take } from 'rxjs';
import { AuthenticationsService } from './authentications.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class DatastorageService {
  user = new BehaviorSubject<User>({
    _token: '',
    _tokenExpirationData: new Date(),
    id: '',
    email: '',
    token: '',
  });

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authenticationsService: AuthenticationsService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    console.log('All recipes', recipes);

    this.httpClient
      .post(
        'https://http-recipes-project-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  fetchData() {
    return this.authenticationsService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.httpClient
            .get<{ [key: string]: Recipe[] }>(
              'https://http-recipes-project-default-rtdb.firebaseio.com/recipes.json'
            )
            .pipe(
              map((recipeData: { [key: string]: Recipe[] }) => {
                const modifiedData: Recipe[] = [];
                for (const key in recipeData) {
                  if (recipeData.hasOwnProperty(key)) {
                    modifiedData.push(...recipeData[key]);
                  }
                }
                return modifiedData;
              })
            );
        })
      )
      .subscribe({
        next: (data: Recipe[]) => {
          console.log(data);
          this.recipeService.setRecipes(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
