import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';
import { InputComponent } from '../components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    ImageComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  public showPassword = signal(false);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  redirecToHome() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.redirecToHome();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
