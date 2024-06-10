import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ImageComponent } from '../../../components/image/image.component';
import { MoneyBagComponent } from '../../../components/svg/money-bag.component';
import { CartStore } from '../../../store/project.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe, MoneyBagComponent, JsonPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly cartStore = inject(CartStore);
  public productsCount = this.cartStore.products.length;
}
