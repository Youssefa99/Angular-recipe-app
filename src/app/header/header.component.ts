import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';

@Component({
selector: 'app-header',
templateUrl: './header.component.html'
})

export class HeaderComponent{
constructor(private route: Router, private recipeService: RecipeService){}

    saveData(){
        this.recipeService.saveRecipes();
    }
    fetchData(){
        this.recipeService.fetchRecipes();
    }
}