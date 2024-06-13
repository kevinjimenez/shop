import { Component, signal } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CartModalComponent } from './modals/cart-modal/cart-modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MatSidenavModule,
    CartModalComponent,
  ],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {
  public mode = signal<MatDrawerMode>('over');
}
