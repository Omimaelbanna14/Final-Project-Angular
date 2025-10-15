import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../../core/interfaces/iproduct.interface';
import { WishlistService } from '../../../../shared/services/WishList/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../../shared/services/Cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [NgIf, NgFor],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishListProducts: IProduct[] = [];
  constructor(private _WishlistService:WishlistService, private toastr:ToastrService, private _CartService:CartService){}
  ngOnInit(): void {
    this.getWishList();
  }
  getWishList(){
    this._WishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListProducts = res.data;
      },
      error: (err) => {
        console.log(err);
        
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

  removeFromWishList(productId: string){
    this._WishlistService.RemoveProductFromWishList(productId).subscribe({
      next: (res) => {
        this.wishListProducts = this.wishListProducts.filter(p => p._id !== productId);
        this.toastr.info(res.message, res.status, {
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
