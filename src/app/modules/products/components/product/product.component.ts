import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../../../../core/models/error-response.model';
import { Product } from '../../../../core/models/product.model';
import { ProductsService } from '../../../../core/services/products.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { StarComponent } from '../../../../shared/components/svg/star.component';
import { CartStore } from '../../../../store/project.store';

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
  private readonly productsService = inject(ProductsService);
  private readonly cartStore = inject(CartStore);
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

  public addToCart(product: Product) {
    this.cartStore.addToCart(product);
  }
}
