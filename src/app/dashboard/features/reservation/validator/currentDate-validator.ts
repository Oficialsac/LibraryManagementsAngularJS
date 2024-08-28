import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function reservationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reservationDate = control.value;
    const ActualreservationDate = new Date(reservationDate);
    const currentDate = new Date();

    ActualreservationDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    if (ActualreservationDate) {
      return ActualreservationDate < currentDate
        ? { invalidReservationDate: true }
        : null;
    }

    return null;
  };
}
