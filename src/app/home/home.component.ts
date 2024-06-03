import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, throwError } from 'rxjs';
import { ErrorResponse } from '../core/models/error-response.mode';
import { LostConnectionComponent } from '../components/lost-connection/lost-connection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, LostConnectionComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readonly productsService = inject(ProductsService);
  readonly #activatedRoute = inject(ActivatedRoute);

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
}
