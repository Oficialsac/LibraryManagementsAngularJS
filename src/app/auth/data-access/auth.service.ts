import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../../shared/data-access/storage.service';
import { Session } from '../../shared/data-access/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _storage = inject(StorageService);

  login(email: string, password: string): Observable<any> {
    return this._http
      .post(`http://localhost:3000/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._storage.set('session', JSON.stringify(response));
        })
      );
  }


  getCurrentSession(){
    if(this._storage.get<Session>('session') == null) return null

    return this._storage.get<Session>('session')?.user_info
  }
}
