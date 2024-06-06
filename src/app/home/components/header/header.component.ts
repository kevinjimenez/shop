import { Component } from '@angular/core';
import { ImageComponent } from '../../../components/image/image.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImageComponent, CurrencyPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
