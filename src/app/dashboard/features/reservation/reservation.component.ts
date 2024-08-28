import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReservationService } from '../../data-access/reservation.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Session } from '../../../shared/data-access/auth-state.service';
import { BrowserModule } from '@angular/platform-browser';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import DataSharingService from '../../data-access/data-sharing.service';
import Swal from 'sweetalert2';
import { expirationDateValidator } from './validator/date-validator';
import { reservationDateValidator } from './validator/currentDate-validator';

interface IReservation {
  bookIsbn: string;
  reservationDate: FormControl<Date>;
  expirationDate: FormControl<Date>;
}
@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export default class ReservationComponent {
  private _reservatioService = inject(ReservationService);
  private _formBuilder = inject(FormBuilder);
  private _storage = inject(StorageService);
  private _router = inject(Router);
  private _dataSharingService = inject(DataSharingService);

  session: Session | null = this._storage.get<Session>('session');
  currentUser = this.session?.user_info._id;

  form = this._formBuilder.group<IReservation>(
    {
      bookIsbn: this._dataSharingService.getData('selectedBookId'),
      reservationDate: this._formBuilder.nonNullable.control(new Date(), [
        Validators.required,
        reservationDateValidator(),
      ]),
      expirationDate: this._formBuilder.nonNullable.control(new Date(), [
        Validators.required,
      ]),
    },
    { validators: [expirationDateValidator()] }
  );

  onSubmit() {
    if (this.form.valid) {
      const body = {
        ...this.form.getRawValue(),
        status: 'Active',
        userDocumentId: this.currentUser || '',
      };

      this._reservatioService.createReservation(body).subscribe({
        next: (response: any) => {
          Swal.fire({
            title: 'Reservation was successfully created',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          this._router.navigateByUrl('/dashboard/books');
        },
      });
    }
  }
}
