import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shoppinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
@Output() ingredientAdded = new EventEmitter<Ingredient>();
subscription: Subscription;
editMode = false;
editedItemIndex: number;
editedItem: Ingredient;
@ViewChild('f') form: NgForm;
  constructor(private shoppingservice: ShoppingService) { }

  ngOnInit() {
this.subscription = this.shoppingservice.editing.subscribe(
  (index: number) => {
    this.editedItemIndex = index;
    this.editMode = true;
    this.editedItem = this.shoppingservice.getIngredients(index);
    this.form.setValue({
      name: this.editedItem.name,
      qty: this.editedItem.qty
    })
  }
)
  }
onAdded(form: NgForm){
  const value = form.value;
const newIngredient = new Ingredient(value.name,value.qty);
if(this.editMode){
  this.shoppingservice.updateIngredients(this.editedItemIndex,newIngredient)
}
else{
this.shoppingservice.onIngredientAdded(newIngredient);
}
this.editMode = false;
form.reset();
}
onClear(){
  this.form.reset();
  this.editMode = false;
}
onDelete(){
  this.shoppingservice.deleteIngredient(this.editedItemIndex);
  this.onClear();
}
ngOnDestroy(){
this.subscription.unsubscribe();
}
}
