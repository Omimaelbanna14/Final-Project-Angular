import { Component, inject, OnInit } from '@angular/core';
import { IBrand } from '../../../core/interfaces/ibrand.interface';
import { RouterLink } from '@angular/router';
import { BrandService } from '../../../shared/services/Brands/brand.service';
import { Brand } from '../../../core/interfaces/iproduct.interface';


@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandService: BrandService) { }

  allBrands!: Brand[];
  selectedSpecificBrand!: Brand[];
  ngOnInit(): void {
    this._BrandService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.allBrands = res.data
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  openBrand(brand_id: string) {
    this._BrandService.getAllProducts(brand_id).subscribe({
      next: (res) => {
        this.selectedSpecificBrand = res.data
        console.log(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


}
