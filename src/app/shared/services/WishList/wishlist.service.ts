import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly baseURL = `${environment.baseURL}/api/v1/wishlist`;

  getLoggedUserWishList(): Observable<any>{
    return this._HttpClient.get(this.baseURL);
  }
  AddProductToWishList(productId: string): Observable<any>{
    return this._HttpClient.post(this.baseURL, {productId});
  }
  RemoveProductFromWishList(productId: string): Observable<any>{
    return this._HttpClient.delete(`${this.baseURL}/${productId}`);
  }
}
