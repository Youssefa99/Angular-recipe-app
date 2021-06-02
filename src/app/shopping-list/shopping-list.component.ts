import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService} from './shoppinglist.service'
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredient[];
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(){
this.ingredients = this.shoppingService.getList();
this.shoppingService.ingredientAdded.subscribe(
  (newIngredients: Ingredient[]) => {
    this.ingredients = newIngredients;
  }
)
  }
  onEditList(index: number){
this.shoppingService.editing.next(index);
  }

}
