import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AlertTriangleComponent } from '../../shared/components/svg/alert-triangle.component';

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
