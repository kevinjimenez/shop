import { Component, Inject, signal, inject } from '@angular/core';
import { ImageComponent } from '../../../components/image/image.component';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { StarComponent } from '../../../components/svg/star.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-quantity',
  standalone: true,
  imports: [
    ImageComponent,
    TitleCasePipe,
    StarComponent,
    CurrencyPipe,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './product-quantity.component.html',
})
export class ProductQuantityComponent {
  public dialogRef = inject(DialogRef<Product>);
  public quantity = new FormControl<number>(0, [Validators.required]);

  public product = signal<Product | null>(null);
  public count = signal<number>(0);

  constructor(@Inject(DIALOG_DATA) public data: Product) {
    this.product.set(data);
  }

  onDecrement() {
    if (this.quantity.value === null) return;
    this.count.set(Number(this.quantity.value) - 1);
    if (this.count() >= 0) {
      this.quantity.setValue(this.count());
    }
  }

  onIncrement() {
    if (this.quantity.value === null) return;
    this.count.set(Number(this.quantity.value) + 1);
    this.quantity.setValue(this.count());
  }

  public onClose() {
    this.dialogRef.close();
  }
}
