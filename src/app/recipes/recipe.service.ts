import { recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shoppinglist.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<recipe>();
    recipeChanged = new Subject<recipe[]>();
    private recipes: recipe[] = [
        new recipe('A test recipe'
        ,'A test recipe description'
        ,'https://images.app.goo.gl/rdjASRRPX4UhokWE8'
        ,[
            new Ingredient('meat', 1),
            new Ingredient('French Fries',20)
        ]),
        new recipe('Another test recipe'
        ,'A test recipe description'
        ,'https://images.app.goo.gl/rdjASRRPX4UhokWE8'
        ,[
            new Ingredient('meat',1),
            new Ingredient('buns',2)
        ])
      ];

      constructor(private shoppingService: ShoppingService , private http: HttpClient){}
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(id: number){
          return this.recipes[id];
      }
      addIngredientsTOSL(ingredients: Ingredient[]){
this.shoppingService.addIngredientsThroughShoppingList(ingredients);      }
        addRecipe(recipe: recipe){
            this.recipes.push(recipe);
            this.recipeChanged.next(this.recipes.slice());
        }
        updateRecipe(index: number, recipe: recipe){
            this.recipes[index] = recipe;
        }
        deleteRecipe(index: number){
            this.recipes.splice(index,1);
            this.recipeChanged.next(this.recipes.slice());
        }
        saveRecipes(){
            this.http.put('https://cooking-list-90b4c.firebaseio.com/recipes.json',this.recipes).subscribe(
                response => {
                    console.log(response);
                }
            );
        }
        fetchRecipes(){
            this.http.get('https://cooking-list-90b4c.firebaseio.com/recipes.json').subscribe(
                recipes => {
                    console.log(recipes);
                }
            );
        }       
}