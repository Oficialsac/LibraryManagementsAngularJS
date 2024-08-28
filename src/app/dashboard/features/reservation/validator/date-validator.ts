import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reservationDate = control.get('reservationDate')?.value;
    const expirationDate = control.get('expirationDate')?.value;

    if (reservationDate && expirationDate) {
      const reservation = new Date(reservationDate);
      const expiration = new Date(expirationDate);

      return expiration < reservation
        ? { expirationBeforeReservation: true }
        : null;
    }
    return null;
  };
}
