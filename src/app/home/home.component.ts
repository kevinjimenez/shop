import { Dialog } from '@angular/cdk/dialog';
import { CurrencyPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LostConnectionComponent } from '../components/lost-connection/lost-connection.component';
import { ErrorResponse } from '../core/models/error-response.mode';
import { Product } from '../core/models/product.model';
import { ProductsService } from '../core/services/products.service';
import { DetailsProductComponent } from './modals/details-product/details-product.component';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    LostConnectionComponent,
    ButtonComponent,
    ImageComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly productsService = inject(ProductsService);
  readonly #activatedRoute = inject(ActivatedRoute);

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

  ngOnInit(): void {
    this.#activatedRoute.data.subscribe(data => console.log(data));
  }

  viewDetailsProduct(product: Product) {
    console.log(product);
    const dialogRef = this.dialog.open<Product>(DetailsProductComponent, {
      // minWidth: '800px',
      // maxWidth: '50%',
      data: product,
    });

    dialogRef.closed.subscribe(output => {});
  }
}
