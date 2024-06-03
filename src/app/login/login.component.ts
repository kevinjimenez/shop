import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../components/button/button.component';
import { ImagePipe } from '../pipes/image.pipe';
import { ImageComponent } from '../components/image/image.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ButtonComponent, ImageComponent],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  private readonly router = inject(Router);

  redirecToHome() {
    this.router.navigate(['home']);
  }
}
