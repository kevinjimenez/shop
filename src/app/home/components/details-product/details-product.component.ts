import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { ImageComponent } from '../../../components/image/image.component';
import { StarComponent } from '../../../components/svg/star.component';
import { Product } from '../../../core/models/product.model';

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

  public id = input();

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
