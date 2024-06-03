import { Component } from '@angular/core';
import { PlugConnectedComponent } from '../svg/plug-connected.component';

@Component({
  selector: 'app-lost-connection',
  standalone: true,
  imports: [PlugConnectedComponent],
  templateUrl: './lost-connection.component.html',
})
export class LostConnectionComponent {}
