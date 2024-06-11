import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../../core/models/product.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { StarComponent } from '../../../../shared/components/svg/star.component';

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
  public dialogRef = inject(DialogRef<number>);
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

  public addToCart() {
    this.dialogRef.close(this.quantity.value ?? 0);
  }

  public onClose() {
    this.dialogRef.close();
  }
}
