import { WishlistService } from './../shared/services/WishList/wishlist.service';
import { Component } from '@angular/core';
import { SubcategoriesService } from '../shared/services/SubCategories/subcategories.service';
import { SubCategory } from '../core/interfaces/icategory.interface';
import { CatagoriesService } from '../shared/services/Categories/catagories.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/Cart/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../shared/services/Products/products.service';
import { IProduct } from '../core/interfaces/iproduct.interface';
import { NgClass, NgIf } from '@angular/common';



@Component({
  selector: 'app-sub-categories',
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.css'
})
export class SubCategoriesComponent {
  toggleWishList(_t10: IProduct) {
    throw new Error('Method not implemented.');
  }
  addToCart(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private _CatagoriesService: CatagoriesService, private toster: ToastrService, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService, private _WishlistService: WishlistService) { }

  subcategory_id!: string
  products!: IProduct[]
  productDetails!: IProduct[]
  wishListProducts: IProduct[] = []


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.subcategory_id = param.get('sub_id')!;

        this._CatagoriesService.getAllProducts(this.subcategory_id).subscribe({
          next: (res) => {
            this.products = res.data
            console.log(this);

          }
        })

      }
    })
  }

}
