import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { ShoppingCartOffComponent } from '../../../shared/components/svg/shopping-cart-off.component';
import { CartStore } from '../../../store/cart.store';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    ImageComponent,
    ShoppingCartOffComponent,
    CurrencyPipe,
  ],
  templateUrl: './cart-modal.component.html',
})
export class CartModalComponent {
  readonly cartStore = inject(CartStore);
  readonly onClose = output();

  public removeProduct(id: number) {
    this.cartStore.removeFromCart(id);
  }
}
