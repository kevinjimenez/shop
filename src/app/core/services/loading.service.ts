import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = signal(false);

  public hide(time = 100000) {
    // this.isLoading.set(false);
    console.log(time);

    setTimeout(() => {
      console.log('hide', this.isLoading());

      this.isLoading.update(value => !value);
    }, 10000);
  }

  public show() {
    this.isLoading.update(value => !value);
    // setTimeout(() => this.isLoading.set(true), time);
  }
}
