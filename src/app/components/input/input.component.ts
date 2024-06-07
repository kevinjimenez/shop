import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValiationForm } from '../../utils/customValidationForm';
import { ImageComponent } from '../image/image.component';

export type InputType = 'text' | 'number' | 'password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ImageComponent, NgClass, ReactiveFormsModule],
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
  public control = input<FormControl>(new FormControl());
  public required = input<boolean>(false);

  protected get inputClass() {
    return {
      'ps-10': (this.prefixIcon() ?? null) !== null,
      'pe-10': this.inputType() === 'password',
      [this.customClass() ?? '']: this.customClass() !== null,
    };
  }

  protected get classContainer() {
    return {
      [this.containerClass() ?? 'mb-3']: this.containerClass() !== null,
    };
  }

  protected get invalidField() {
    return this.control().touched && this.control().invalid;
  }

  protected get errorMessage(): string | null {
    if (!this.control() && !this.control().errors) return null;
    return CustomValiationForm.message(this.control().errors!, this.label());
  }

  public onShowPassword() {
    this.showPassword.update(value => !value);
  }
}
