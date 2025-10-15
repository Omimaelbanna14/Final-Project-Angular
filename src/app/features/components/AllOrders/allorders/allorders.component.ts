import { AuthService } from './../../../../shared/services/authentication/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Iorder } from '../../../../core/interfaces/iorder.interface';
import { OrdersService } from '../../../../shared/services/Oreders/orders.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
private readonly _OrdersService = inject(OrdersService);
private readonly _AuthService = inject(AuthService);

allOrders!:Iorder[]  ;
userId!:string;
ngOnInit() {

  const userInfo = this._AuthService.userInfo;

  if (userInfo && userInfo.id) {
    this.userId = userInfo.id;
    this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrders = res;
        console.log(this.allOrders);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  } else {
    console.error('User not found!');
  }
}
}
