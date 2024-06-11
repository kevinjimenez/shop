import { Component, HostListener, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactive } from '../../core/guards/exit.guard';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ImageComponent } from '../../shared/components/image/image.component';
import { InputComponent } from '../../shared/components/input/input.component';

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
export default class RegisterComponent implements CanComponentDeactive {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  public registerForm = this.formBuilder.group({
    name: [
      '',
      {
        nonNullable: true, // similar al NonNullableFormBuilder
        validators: [Validators.required],
      },
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  canDeactivate(): boolean | Observable<boolean> {
    const isValidRegisterForm = Object.values(this.registerForm.controls).some(
      control => control.value !== ''
    );

    return isValidRegisterForm && this.registerForm.invalid;
  }

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

  @HostListener('window:beforeunload', ['$event'])
  onBeforeReload(e: BeforeUnloadEvent) {
    const isValidRegisterForm = Object.values(this.registerForm.controls).some(
      control => control.value !== ''
    );
    if (isValidRegisterForm) {
      e.preventDefault(); // este evita que se recargue la pagina
    }
  }
}
