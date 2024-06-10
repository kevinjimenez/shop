import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';

export type ButtonColor = 'success' | 'danger' | 'primary' | '';
export type ButtonType = 'button' | 'submit';

export interface ButtonIcon {
  name: string;
  folder?: string;
  sizeClass?: string;
  left?: boolean;
  rigth?: boolean;
}

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass, ImagePipe],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  public customClass = input<string>();
  public text = input<string>();
  public color = input<ButtonColor>('primary');
  public type = input<ButtonType>('button');
  public customContend = input<boolean>(false);
  public icon = input<ButtonIcon>();

  public onClick = output();

  private get buttonColor() {
    return {
      'bg-success/80 hover:bg-success text-white': this.color() === 'success',
      'bg-danger/95 hover:bg-danger text-white': this.color() === 'danger',
      'bg-tertiary text-headline font-semibold': this.color() === 'primary',
      'bg-white hover:bg-gray-100': this.color() === '',
    };
  }

  protected get buttonClass() {
    return {
      ...this.buttonColor,
      'gap-x-1': this.text() && this.icon()?.name,
      [this.customClass() ?? '']: this.customClass() !== null,
      // 'cursor-not-allowed opacity-50': this.disabled(),
    };
  }

  protected get iconSize() {
    return {
      [this.icon()?.sizeClass ?? 'size-5']: this.icon()?.sizeClass !== null,
    };
  }
}
