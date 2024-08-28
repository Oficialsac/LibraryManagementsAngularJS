import { Component, inject } from '@angular/core';
import { AuthService } from '../../data-access/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent {
  private _authService = inject(AuthService);
  private _storage = inject(StorageService);
  private _router = inject(Router);

  user = {
    id: '',
    email: '',
  };
  ngOnInit(): void {
    const userProfile = this._authService.getCurrentSession();
    if (!userProfile) {
      this._router.navigateByUrl('/auth/sign-ip');
    }
    this.user.email = userProfile?.email!;
    this.user.id = userProfile?._id!;
  }

  logout() {
    this._storage.remove('session');
    window.location.reload();
  }
}
