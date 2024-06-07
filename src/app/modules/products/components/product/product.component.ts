import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ImageComponent } from '../../../../components/image/image.component';
import { StarComponent } from '../../../../components/svg/star.component';
import { ErrorResponse } from '../../../../core/models/error-response.mode';
import { Product } from '../../../../core/models/product.model';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ImageComponent,
    TitleCasePipe,
    CurrencyPipe,
    ButtonComponent,
    StarComponent,
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent {
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
