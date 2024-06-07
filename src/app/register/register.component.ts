import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    InputComponent,
    ButtonComponent,
    ImageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export default class RegisterComponent {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public redirecToSignIn(): void {
    this.router.navigate(['sign-in']);
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.redirecToSignIn();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
