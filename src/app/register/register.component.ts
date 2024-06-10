import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ImageComponent } from '../components/image/image.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CanComponentDeactive } from '../guards/exit.guard';
import { Observable } from 'rxjs';
import { ConfirmModals } from '../utils/confirm-modals';

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
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  canDeactivate(): boolean | Observable<boolean> {
    const isValidRegisterForm = Object.values(this.registerForm.controls).some(
      control => control.value !== ''
    );

    return isValidRegisterForm;
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
