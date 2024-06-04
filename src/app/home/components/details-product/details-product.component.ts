import { Component, OnInit, inject, input, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ImageComponent } from '../../../components/image/image.component';
import { ErrorResponse } from '../../../core/models/error-response.mode';
import { Product } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { StarComponent } from '../../../components/svg/star.component';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [
    ImageComponent,
    TitleCasePipe,
    CurrencyPipe,
    ButtonComponent,
    StarComponent,
  ],
  templateUrl: './details-product.component.html',
})
export class DetailsProductComponent implements OnInit {
  readonly productsService = inject(ProductsService);
  public product = signal<Product | null>(null);
  public hasError = signal({ error: false, message: '' });

  public productId = input<number>(0, { alias: 'id' });

  ngOnInit(): void {
    this.loadProduct();
  }

  private loadProduct() {
    this.productsService
      .getById(this.productId())
      .pipe(
        catchError((error: ErrorResponse) => {
          this.hasError.set({ error: true, message: error.message });
          return throwError(() => error);
        })
      )
      .subscribe({
        next: product => {
          this.product.set(product);
        },
      });
  }
}
