import { Spinner } from './../../../../../node_modules/ngx-spinner/lib/ngx-spinner.enum.d';
import { Product } from './../../../core/interfaces/icart.interface';
import { WishlistService } from './../../../shared/services/WishList/wishlist.service';
import { Component, input, Input, InputSignal, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CategoriesSliderComponent } from "./components/categories-slider/categories-slider.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-home',
  imports: [SearchPipe, CategoriesSliderComponent, MainSliderComponent, RouterLink, CurrencyPipe, FormsModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private toastr: ToastrService, private _WishlistService: WishlistService, private _NgxSpinnerService: NgxSpinnerService) { }
  products!: IProduct[]

  fromInput: string = ''


  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
        console.log(this.products);
      }
    })
  }
  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {

        console.log(res);

        this._CartService.cartCount.next(res.numOfCartItems)
        console.log('cart count in service', this._CartService.cartCount);
        this.toastr.success(res.message, res.status,
          {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
            toastClass: 'myToast',
            positionClass: 'toast-top-left'
          }
        )
      },
    })
  }
  toggleWishList(product: IProduct) {
    if (!product.inwishlist) {
      product.inwishlist = true;
      this._WishlistService.AddProductToWishList(product._id).subscribe({
        next: (res) => {
          this.toastr.success(res.message, res.status,
            {
              timeOut: 2000,
              closeButton: true,
              progressBar: true
            })
        },
        error: (err) => {
          console.log(err);
          product.inwishlist = false
        }

      })

    } else {
      product.inwishlist = false
      this._WishlistService.RemoveProductFromWishList(product._id).subscribe({
        next: (res) => {
          this.toastr.info(res.message, res.status,
            {
              timeOut: 2000,
              closeButton: true,
              progressBar: true
            })
        },
        error: (err) => {
          console.log(err);
        }

      })

    }
  }
}