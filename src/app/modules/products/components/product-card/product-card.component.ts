import { Component, inject, input } from '@angular/core';
import { ImageComponent } from '../../../../components/image/image.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { Product } from '../../../../core/models/product.model';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ProductQuantityComponent } from '../../modals/product-quantity/product-quantity.component';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ImageComponent, ButtonComponent, TitleCasePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private readonly _router = inject(Router);
  private readonly dialog = inject(Dialog);

  public product = input.required<Product>();

  productQuantity(product: Product) {
    const dialogRef = this.dialog.open<Product>(ProductQuantityComponent, {
      // disableClose: true,
      width: '500px',
      // maxHeight: '600px',
      data: product,
    });

    dialogRef.closed.subscribe(output => {});
  }

  viewDetailsProduct(product: Product) {
    this._router.navigate(['/home/product', product.id]);
  }
}
