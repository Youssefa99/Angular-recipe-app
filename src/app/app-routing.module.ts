import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { NoRecipeComponent } from './recipes/no-recipe/no-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './authentication/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes' , component: RecipesComponent, children: [
    {path: '' , component: NoRecipeComponent},
    {path: 'new' , component:  RecipeEditComponent},
    {path: ':id' , component: RecipeDetailComponent},
    {path: ':id/edit' , component:  RecipeEditComponent}
  ]},
  { path: 'shopping-List' , component: ShoppingListComponent},
  { path: 'authentication' , component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
