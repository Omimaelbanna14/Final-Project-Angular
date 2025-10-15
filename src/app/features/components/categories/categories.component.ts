import { SubcategoriesService } from './../../../shared/services/SubCategories/subcategories.service';
import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from '../../../shared/services/Categories/catagories.service';
import { ICategory, SubCategory } from '../../../core/interfaces/icategory.interface';
import { CarouselModule } from "ngx-owl-carousel-o";
import { SubCategoriesComponent } from "../../../sub-categories/sub-categories.component";
import { RouterLink } from '@angular/router';
import { Subcategory } from '../../../core/interfaces/iproduct.interface';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-categories',
  imports: [CarouselModule, SubCategoriesComponent, RouterLink, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  constructor(private _CatagoriesService: CatagoriesService) { }

  categoryTitle: string = '';
  allCategories!: ICategory[]
  selectedSubCategories!: ICategory[]
  activeCategoryId!: string | null;

  ngOnInit(): void {
    this._CatagoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  showSubCategories(category_id: string, category_name: string) {
    this.categoryTitle = category_name;
    this._CatagoriesService.getSubCategories(category_id).subscribe({
      next: (res) => {
        this.selectedSubCategories = res.data;
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}

