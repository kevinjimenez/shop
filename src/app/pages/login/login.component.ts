import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { InputComponent } from '../../shared/components/input/input.component';

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
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  public showPassword = signal(false);

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]],
  });

  redirecToHome() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .signIn({
          username: this.loginForm.value.username!,
          password: this.loginForm.value.password!,
        })
        .pipe(tap(({ token }) => localStorage.setItem('token', token)))
        .subscribe(() => this.redirecToHome());
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
