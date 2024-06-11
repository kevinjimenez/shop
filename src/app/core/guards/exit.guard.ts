import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmModals } from '../../utils/confirm-modals';

export interface CanComponentDeactive {
  canDeactivate: () => Observable<boolean> | boolean;
}

export const exitGuard: CanDeactivateFn<CanComponentDeactive> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  console.log({ component, currentRoute, currentState, nextState });
  const formularioValido = component.canDeactivate();

  if (formularioValido) {
    return ConfirmModals.exit();
  }

  return true;
};
