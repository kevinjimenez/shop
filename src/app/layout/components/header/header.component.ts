import { OverlayModule } from '@angular/cdk/overlay';
import { CurrencyPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { ImageComponent } from '../../../shared/components/image/image.component';
import { MoneyBagComponent } from '../../../shared/components/svg/money-bag.component';
import { CartStore } from '../../../store/project.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe, MoneyBagComponent, OverlayModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly cartStore = inject(CartStore);
  public openCart = output();

  public productsCount = this.cartStore.products.length;
}
