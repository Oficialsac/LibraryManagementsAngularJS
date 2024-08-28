import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { inject } from '@angular/core';
import { DashboardService } from '../../data-access/dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Session } from 'inspector';
import Swal from 'sweetalert2';
import DataSharingService from '../../data-access/data-sharing.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  private _booksService = inject(DashboardService);
  private _router = inject(Router);
  private _storage = inject(StorageService);
  private _dataSharingService = inject(DataSharingService);
  booksSignal = toSignal(this._booksService.getBooks());

  get books() {
    return this.booksSignal();
  }

  setReservation(bookId: string) {
    if (this._storage.get<Session>('session') == null) {
      Swal.fire({
        text: 'You need be logged in',
        icon: 'error',
        confirmButtonText: 'Cool',
      });

      this._router.navigateByUrl('/auth/sign-in');
    } else {
      console.log(bookId);

      this._dataSharingService.setData('selectedBookId', bookId);
      this._router.navigateByUrl('/dashboard/reservation');
    }
  }
}
