import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface IReservation {
  reservationId: string;
  bookIsbn: string;
  userId: string;
  reservationDate: Date;
  expirationDate: Date;
  status: string;
}
@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http = inject(HttpClient);

  createReservation(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/reservation', body);
  }

  getUserReservations(_id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/reservation/${_id}`);
  }

  removeReservation(_id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/reservation/${_id}`);
  }

  updateReservation(_id: string, body: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/reservation/${_id}`, body);
  }
}
