import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingComponent } from '../components/loading/loading.component';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, LoadingComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly productsService = inject(ProductsService);
  // readonly #activatedRoute = inject(ActivatedRoute);

  public products = toSignal(this.productsService.getAll(), {
    initialValue: [],
  });

  // ngOnInit(): void {
  //   this.#activatedRoute.data.subscribe(data => console.log(data));
  // }
}
