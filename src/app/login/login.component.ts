import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';
import { InputComponent } from '../components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ButtonComponent, ImageComponent, InputComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private readonly router = inject(Router);

  public showPassword = signal(false);

  redirecToHome() {
    this.router.navigate(['home']);
  }
}
