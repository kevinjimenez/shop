import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { AlertTriangleComponent } from '../../components/svg/alert-triangle.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-exit-modal',
  standalone: true,
  imports: [AlertTriangleComponent, ButtonComponent],
  templateUrl: './exit-modal.component.html',
})
export class ExitModalComponent {
  public dialogRef = inject(DialogRef<boolean>);

  public onConfirm() {
    this.dialogRef.close(true);
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
