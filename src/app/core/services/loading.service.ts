import { Injectable, inject, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly ngxSpinnerService = inject(NgxSpinnerService);

  public hide(time = 250) {
    console.log(time);

    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, time);
  }

  public show() {
    this.ngxSpinnerService.show();
  }
}
