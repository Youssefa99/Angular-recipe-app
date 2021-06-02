import { Ingredient } from '../shared/ingredient.model'
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs'
export class ShoppingService{
  ingredientAdded = new EventEmitter<Ingredient[]>();
  ingredientChanged = new Subject <Ingredient[]>();
  editing = new Subject <number>();
  private  ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('tomato',3)
      ];

      getList(){
         return this.ingredients.slice();
      }
      getIngredients(index: number){
        return this.ingredients[index];
      }
      onIngredientAdded(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientAdded.emit(this.ingredients.slice());
      }
    addIngredientsThroughShoppingList(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.emit(this.ingredients.slice());
    }
    updateIngredients(index: number, ingredient: Ingredient){
      this.ingredients[index] = ingredient;
      this.ingredientAdded.emit(this.ingredients.slice());
    }
    deleteIngredient(index: number){
      this.ingredients.splice(index,1);
      this.ingredientAdded.emit(this.ingredients.slice());
    }
}