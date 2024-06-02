import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    {{ isLoading() }}
    @if (isLoading()) {
      <span class="loader"></span>
    }
  `,
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  public loadingService = inject(LoadingService);
  public isLoading = this.loadingService.isLoading;
}
