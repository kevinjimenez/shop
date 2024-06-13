import { Dialog } from '@angular/cdk/dialog';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models/product.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { CartStore } from '../../../../store/cart.store';
import { ProductQuantityComponent } from '../../modals/product-quantity/product-quantity.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ImageComponent, ButtonComponent, TitleCasePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private readonly _router = inject(Router);
  private readonly dialog = inject(Dialog);
  private readonly cartStore = inject(CartStore);

  public product = input.required<Product>();

  productQuantity(product: Product) {
    const dialogRef = this.dialog.open<number>(ProductQuantityComponent, {
      // disableClose: true,
      width: '500px',
      // maxHeight: '600px',
      data: product,
    });

    dialogRef.closed.subscribe(output => {
      if (!output) return;
      if (output <= 0) return;

      for (let i = 0; i < output; i++) {
        const cloneProduct = Object.assign({}, product);
        this.cartStore.addToCart(cloneProduct);
      }
    });
  }

  addToCart(product: Product) {
    this.cartStore.addToCart(product);
  }

  viewDetailsProduct(product: Product) {
    this._router.navigate(['/home/product', product.id]);
  }
}
