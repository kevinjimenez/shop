import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageComponent } from '../../shared/components/image/image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ImageComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
