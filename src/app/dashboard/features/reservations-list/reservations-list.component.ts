import { Component, inject } from '@angular/core';
import { ReservationService } from '../../data-access/reservation.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Session } from '../../../shared/data-access/auth-state.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import DataSharingService from '../../data-access/data-sharing.service';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css',
})
export default class ReservationsListComponent {
  private _reservationService = inject(ReservationService);
  private _storage = inject(StorageService);
  private _dataServiceSharing = inject(DataSharingService);

  session: Session | null = this._storage.get<Session>('session');
  currentUser = this.session?.user_info._id;

  reservationSignal = toSignal(
    this._reservationService.getUserReservations(this.currentUser || '')
  );

  private _router = inject(Router);

  get reservations() {
    return this.reservationSignal();
  }
  ngOnInit(): void {
    if (this._storage.get<Session>('session') == null) {
      Swal.fire({
        text: 'You need be logged in',
        icon: 'error',
        confirmButtonText: 'Cool',
      });

      this._router.navigateByUrl('/auth/sign-in');
    }
  }
  removeReservation(idReservation: any) {
    this._reservationService.removeReservation(idReservation).subscribe({
      next: () => {
        Swal.fire({
          title: 'Reservation was successfully removed',
          icon: 'success',
          confirmButtonText: 'Cool',
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  }

  async updateReservation(reser: any) {
    const {
      _id,
      reservationId,
      bookIsbn,
      userId,
      reservationDate,
      expirationDate,
      status,
      userDocumentId,
    } = reser;
    const { value: formValues } = await Swal.fire({
      title: 'Update Reservation',
      html:
        `<p>${_id}</p>` +
        `<input id="swal-status" class="swal2-input" placeholder="Status Reservation">` +
        `<input id="swal-reservationDate" class="swal2-input" type="date" placeholder="Reservation Date" value=${reservationDate}}>` +
        `<input id="swal-expirationDate" class="swal2-input" type="date" placeholder="Expiration Date" value=${expirationDate}>`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          status: (document.getElementById('swal-status') as HTMLInputElement)
            .value,
          reservationDate: (
            document.getElementById('swal-reservationDate') as HTMLInputElement
          ).value,
          expirationDate: (
            document.getElementById('swal-expirationDate') as HTMLInputElement
          ).value,
        };
      },
    });

    const body = {
      ...formValues,
      userDocumentId: userDocumentId, 
      bookIsbn: bookIsbn,
    };

    this._reservationService.updateReservation(_id, body).subscribe({
      next: () => {
        Swal.fire('Updated!', 'Your reservation has been updated.', 'success');
      },
      error: () => {
        Swal.fire(
          'Error',
          'Please check the form for errors and try again.',
          'error'
        );
      },
    });
  }
}
