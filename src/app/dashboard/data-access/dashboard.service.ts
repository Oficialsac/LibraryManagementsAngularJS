import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/data-access/storage.service';
import { Session } from '../../shared/data-access/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private _storage = inject(StorageService);
  getBooks(): Observable<any> {
    return this.http.get('http://localhost:3000/books');
  }
}
