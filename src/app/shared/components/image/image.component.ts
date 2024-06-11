import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { ImagePipe } from '../../pipes/image.pipe';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [ImagePipe, NgClass],
  templateUrl: './image.component.html',
})
export class ImageComponent {
  public name = input<string>();
  public folder = input<string>();
  public customClass = input<string>();
  public alt = input<string>();

  protected get imageClass() {
    return {
      [this.customClass() ?? '']: this.customClass() !== null,
    };
  }
}
