import { Dialog } from '@angular/cdk/dialog';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';
import { LostConnectionComponent } from '../components/lost-connection/lost-connection.component';
import { ErrorResponse } from '../core/models/error-response.mode';
import { Product } from '../core/models/product.model';
import { ProductsService } from '../core/services/products.service';
import { ProductQuantityComponent } from './modals/product-quantity/product-quantity.component';
import { CategoriesService } from '../core/services/categories.service';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    LostConnectionComponent,
    ButtonComponent,
    ImageComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  // readonly #activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  private readonly dialog = inject(Dialog);

  public hasError = signal({ error: false, message: '' });

  public products = toSignal(
    this.productsService.getAll().pipe(
      catchError((error: ErrorResponse) => {
        this.hasError.set({ error: true, message: error.message });
        return throwError(() => error);
      })
    ),
    {
      initialValue: [],
    }
  );

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

  // ngOnInit(): void {
  //   this.#activatedRoute.data.subscribe(data => console.log(data));
  // }

  productQuantity(product: Product) {
    const dialogRef = this.dialog.open<Product>(ProductQuantityComponent, {
      disableClose: true,
      width: '500px',
      // maxHeight: '600px',
      data: product,
    });

    dialogRef.closed.subscribe(output => {});
  }

  viewDetailsProduct(product: Product) {
    this._router.navigate(['home/product', product.id]);
  }
}
