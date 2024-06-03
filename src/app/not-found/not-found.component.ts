import { Component } from '@angular/core';
import { ImageComponent } from '../components/image/image.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ImageComponent],
  templateUrl: './not-found.component.html',
})
export default class NotFoundComponent {}
