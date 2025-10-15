import { Product } from './../../../core/interfaces/icart.interface';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../shared/pipes/Search/search-pipe';
import { CategoriesSliderComponent } from '../home/components/categories-slider/categories-slider.component';
import { MainSliderComponent } from '../home/components/main-slider/main-slider.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../shared/services/WishList/wishlist.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
    selector: 'app-products',
    imports: [SearchPipe, CategoriesSliderComponent, MainSliderComponent, RouterLink, CurrencyPipe, FormsModule, NgClass, NgxPaginationModule],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent {
    constructor(private _ProductsService: ProductsService, private _CartService: CartService, private toastr: ToastrService, private _WishlistService: WishlistService) { }
    products!: IProduct[]
    fromInput: string = ''
    total!: number
    pageSize!: number
    p!: number
    productId!:string


    ngOnInit(): void {
        this.getAllProductsData()
    
    }
    
    getAllProductsData(pageNumber: number = 1): void {
        this._ProductsService.getAllProducts(pageNumber).subscribe({
            next: (res) => {
                this.products = res.data
                this.pageSize = res.metadata.limit
                this.p = res.metadata.currentPage
                this.total = res.results
                this._WishlistService.getLoggedUserWishList().subscribe({
                    next: (wishListRes) => {
                        const wishListId = wishListRes.data.map((p: IProduct) => p._id)
                        this.products.forEach(product => {
                            product.inwishlist = wishListId.includes(product._id)
                        })
                    },
                    error: (err) => console.log(err)
                });
                console.log(this.products);
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
        }
    }

}
