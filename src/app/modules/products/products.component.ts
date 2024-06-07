import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ButtonComponent } from '../../components/button/button.component';
import { ImageComponent } from '../../components/image/image.component';
import { LostConnectionComponent } from '../../components/lost-connection/lost-connection.component';
import { MoodEmptyComponent } from '../../components/svg/mood-empty.component';
import { ErrorResponse } from '../../core/models/error-response.mode';
import { Product } from '../../core/models/product.model';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TitleCasePipe,
    LostConnectionComponent,
    ButtonComponent,
    ImageComponent,
    MoodEmptyComponent,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  readonly #activatedRoute = inject(ActivatedRoute);

  public hasError = signal({ error: false, message: '' });
  public products = signal<Product[]>([]);
  public limit = signal<number>(5);

  public categories = toSignal(
    this.categoriesService.getAll().pipe(
      catchError((error: ErrorResponse) => {
        this.hasError.set({ error: true, message: error.message });
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

  ngOnInit(): void {
    this.#activatedRoute.data.subscribe(({ products }) => {
      this.products.set(products);
    });
  }

  changeCategory(category?: string) {
    this.products.update(() => []);
    this.productsService
      .getByCategory(category)
      .pipe(
        catchError((error: ErrorResponse) => {
          this.hasError.set({ error: true, message: error.message });
          return throwError(() => error);
        })
      )
      .subscribe({
        next: products => {
          this.products.update(() => products);
        },
      });
  }

  loadMore() {
    this.products.update(() => []);
    this.limit.update(cunrrent => cunrrent + 5);

    this.productsService
      .getAll(this.limit())
      .pipe(
        catchError((error: ErrorResponse) => {
          this.hasError.set({ error: true, message: error.message });
          return throwError(() => error);
        })
      )
      .subscribe({
        next: products => {
          this.products.update(() => products);
        },
      });
  }
}
