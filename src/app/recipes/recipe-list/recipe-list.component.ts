import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: recipe[];
  subscription: Subscription;
@Output() recipeWasSelected = new EventEmitter<recipe>();
  constructor(private recipeService: RecipeService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  onRecipeSelected(recipe: recipe){
    this.recipeWasSelected.emit(recipe);
    
  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
