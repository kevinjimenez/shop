import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mood-empty',
  standalone: true,
  imports: [],
  template: `
    <picture [class]="continerClass()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        [class]="iconClass()">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 10l.01 0" />
        <path d="M15 10l.01 0" />
        <path d="M9 15l6 0" />
      </svg>
    </picture>
  `,
})
export class MoodEmptyComponent {
  public continerClass = input();
  public iconClass = input();
}
