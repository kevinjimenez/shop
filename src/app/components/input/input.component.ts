import { Component, input, model, output, signal } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { NgClass } from '@angular/common';

export type InputType = 'text' | 'number' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ImageComponent, NgClass],
  templateUrl: './input.component.html',
})
export class InputComponent {
  public label = input<string>();
  public inputType = input<InputType>('text');
  public prefixIcon = input<string>();
  public sizeIconClass = input<string>('size-4');
  public placeholder = input<string>();
  public customClass = input<string>();
  public customContend = input<boolean>(false);
  public containerClass = input<string>();
  public showPassword = signal<boolean>(false);

  protected get InputClass() {
    return {
      'ps-10': (this.prefixIcon() ?? null) !== null,
      'pe-10': this.inputType() === 'password',
      [this.customClass() ?? '']: this.customClass() !== null,
    };
  }

  public onShowPassword() {
    console.log('showPassword');
    console.log(this.showPassword());
    this.showPassword.update(value => !value);
    console.log(this.showPassword());
  }
}
