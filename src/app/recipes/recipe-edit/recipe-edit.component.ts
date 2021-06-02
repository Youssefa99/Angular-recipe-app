import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;
recipe: recipe;

  constructor(private route: ActivatedRoute,
     private  recipeService: RecipeService,
      private router: Router,
      private fb: FormBuilder ) {
   
  }
  

  ngOnInit(): void {
this.route.params.subscribe(
  (params: Params) => {
    this.id = +params['id'];
    this.editMode = params['id'] != null;
    this.initForm();
  }
);
  }
  private initForm(){
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imgPath;
      recipeDesc = recipe.desc;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'qty': new FormControl(ingredient.qty,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = this.fb.group({
      'name': new FormControl(recipeName,Validators.required),
      'imgPath': new FormControl(recipeImgPath,Validators.required),
      'desc': new FormControl(recipeDesc,Validators.required),
      'ingredients': recipeIngredients
    });
  }
  
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  } 
  onDelete(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'qty': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onSubmit(){
    const newRecipe = new recipe(this.recipeForm.value['name'],
    this.recipeForm.value['imgPath'],
    this.recipeForm.value['desc'],
    this.recipeForm.value['ingredients']);
 if(this.editMode){
this.recipeService.updateRecipe(this.id,newRecipe);
 }
 else{
   this.recipeService.addRecipe(newRecipe);
 }
  }
  onCancel(){
    this.editMode = false;
    this.router.navigate(['../'],{relativeTo: this.route} );
  }
}
