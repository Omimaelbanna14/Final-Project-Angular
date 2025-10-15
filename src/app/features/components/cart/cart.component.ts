import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ICart } from '../../../core/interfaces/icart.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  cartData: ICart = {} as ICart



  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data
      },
    });
  }




  changeCount(p_id: string, count: number) {
    this._CartService.UpdateCartProductQuantity(p_id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data
      }
    })
  }


  deleteProduct(p_id: string) {
    this._CartService.RemovespecifiCartItem(p_id).subscribe({
      next: (res) => {
        this._CartService.cartCount.next(res.numOfCartItems)
        console.log(res);
        this.cartData = res.data
      }
    })
  }

  clearCart() {
    this._CartService.ClearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success("🛒", res.message, res.status);
        this.cartData.products = [];
        this._CartService.cartCount.next(0);
        this.cartData.totalCartPrice = 0;


      },
      error: (err) => {
        console.error(err);
        this.toastr.error("❌", "Failed to clear basket");
      }
    });
  }

}
