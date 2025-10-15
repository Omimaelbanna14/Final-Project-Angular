import { Product } from './../../../core/interfaces/icart.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { IBrand, IBrand2 } from '../../../core/interfaces/ibrand.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../../shared/services/Brands/brand.service';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/WishList/wishlist.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-br-details',
  imports: [CarouselModule, RouterLink, NgClass, NgIf],
  templateUrl: './br-details.component.html',
  styleUrl: './br-details.component.css'
})
export class BrDetailsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private toastr: ToastrService, private _WishlistService: WishlistService, private _ActivatedRoute: ActivatedRoute, private _BrandService: BrandService) { }


  brandId!: string
  productsDetails: IProduct = {} as IProduct
  products!: IProduct[]
  wishListProducts: IProduct[] = []

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.brandId = param.get('b_id')!;
        this._BrandService.getAllProducts(this.brandId).subscribe({
          next: (res) => {
            this.products = res.data
            console.log(this);

          }
        })

        this._BrandService.getAllProducts(this.brandId).subscribe({
          next: (res) => {
            this.products = res.data;
            console.log(this.products);
          },
          error: (err) => console.log(err)
        });

        this._WishlistService.getLoggedUserWishList().subscribe({
          next: (wishListRes) => {
            const wishListId = wishListRes.data.map((p: IProduct) => p._id)
            this.products.forEach(product => {
              product.inwishlist = wishListId.includes(product._id)
            })
          },
          error: (err) => console.log(err)

        })
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
            progressBar: true
          }
        )
      },
    })
  }

  toggleWishList(Product: IProduct) {
    if (!Product.inwishlist) {
      Product.inwishlist = true
      this._WishlistService.AddProductToWishList(Product._id).subscribe({
        next: (res) => {
          this.toastr.success(res.message, res.status, {
            timeOut: 2000,
            closeButton: true,
            progressBar: true
          })
        },
        error: (err) => {
          console.log(err);
          Product.inwishlist = false

        }
      })
    } else {
      Product.inwishlist = false
      this._WishlistService.RemoveProductFromWishList(Product._id).subscribe({
        next: (res) => {
          this.toastr.success(res.message, res.status, {
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

