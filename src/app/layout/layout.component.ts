import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../components/loading/loading.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './layout.component.html',
})
export default class LayoutComponent {}
