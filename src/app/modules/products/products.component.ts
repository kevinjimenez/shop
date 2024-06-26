import { TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorResponse } from '../../core/models/error-response.model';
import { Product } from '../../core/models/product.model';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { LostConnectionComponent } from '../../shared/components/lost-connection/lost-connection.component';
import { MoodEmptyComponent } from '../../shared/components/svg/mood-empty.component';
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
  public seletedCategory = signal<string | undefined>(undefined);
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
    this.seletedCategory.set(category);
    this.products.update(() => []);
    this.productsService
      .getByCategory({ category })
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
    this.limit.update(cunrrent => cunrrent + 5);

    this.productsService
      .getByCategory({
        category: this.seletedCategory(),
        limit: this.limit(),
      })
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
