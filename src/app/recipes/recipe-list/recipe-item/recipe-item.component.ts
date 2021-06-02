import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipe: recipe;
@Input() index: number;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

}
