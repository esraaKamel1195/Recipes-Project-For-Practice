import { Component } from '@angular/core';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Project-For-Practice';
  loadedFeature: string = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  
}
