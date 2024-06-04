import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, InputComponent, ButtonComponent, ImageComponent],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private readonly router = inject(Router);

  redirecToHome() {
    this.router.navigate(['sign-in']);
  }
}
