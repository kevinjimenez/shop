import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, signal } from '@angular/core';
import { ImageComponent } from '../../../components/image/image.component';
import { Product } from '../../../core/models/product.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { StarComponent } from '../../../components/svg/star.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-details-product',
  standalone: true,
  imports: [
    ImageComponent,
    TitleCasePipe,
    StarComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './details-product.component.html',
})
export class DetailsProductComponent {
  public quantity = new FormControl<number>(0, [Validators.required]);

  public product = signal<Product | null>(null);
  public count = signal<number>(0);

  constructor(@Inject(DIALOG_DATA) public data: Product) {
    this.product.set(data);
  }

  onDecrement() {
    this.count.update(value => value - 1);
    if (this.count() >= 0) {
      this.quantity.setValue(this.count());
    }
  }

  onIncrement() {
    this.count.update(value => {
      if (value < 0) return 1;
      return value + 1;
    });
    this.quantity.setValue(this.count());
  }
}
