import { Dialog } from '@angular/cdk/dialog';
import { inject } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ExitModalComponent } from '../modals/exit-modal/exit-modal.component';

export class ConfirmModals {
  static exit(): Observable<boolean> {
    const dialog = inject(Dialog);
    const dialogRef = dialog.open<boolean>(ExitModalComponent, {
      disableClose: true,
      width: '500px',
    });

    const close = dialogRef.closed.pipe(switchMap(result => of(!!result)));

    return close;
  }
}
