import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ImageComponent } from '../../../components/image/image.component';
import { MoneyBagComponent } from '../../../components/svg/money-bag.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe, MoneyBagComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
