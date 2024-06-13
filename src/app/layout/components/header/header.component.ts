import { OverlayModule } from '@angular/cdk/overlay';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { MoneyBagComponent } from '../../../shared/components/svg/money-bag.component';
import { CartStore } from '../../../store/cart.store';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ImageComponent,
    CurrencyPipe,
    MoneyBagComponent,
    OverlayModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly cartStore = inject(CartStore);
  private readonly _router = inject(Router);
  public showCart = output();

  // public productsCount = this.cartStore.products.length;

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['sign-in']);
  }
}
