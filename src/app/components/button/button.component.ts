import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';

export type ButtonColor = 'success' | 'danger' | '';
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
  public color = input<ButtonColor>('');
  public type = input<ButtonType>('button');
  public customContend = input<boolean>(false);
  public icon = input<ButtonIcon>();

  public onClick = output();

  private get buttonColor() {
    console.log(this.color());

    return {
      'bg-green-600 hover:bg-green-800/80': this.color() === 'success',
      'bg-red-600 hover:bg-red-800/80': this.color() === 'danger',
      'bg-white hover:bg-gray-100': this.color() === '',
    };
  }

  protected get buttonClass() {
    return {
      ...this.buttonColor,
      'gap-x-3': this.text() && this.icon()?.name,
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
