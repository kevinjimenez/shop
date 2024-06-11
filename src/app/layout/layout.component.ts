import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { CartStore } from '../store/project.store';
import { ButtonComponent } from '../shared/components/button/button.component';
import { ShoppingCartOffComponent } from '../shared/components/svg/shopping-cart-off.component';
import { ImageComponent } from '../shared/components/image/image.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    ButtonComponent,
    ShoppingCartOffComponent,
    ImageComponent,
    CurrencyPipe,
  ],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  readonly cartStore = inject(CartStore);
  public mode = signal<MatDrawerMode>('over');
}
