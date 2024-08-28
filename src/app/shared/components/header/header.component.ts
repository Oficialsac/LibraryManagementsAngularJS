import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { throws } from 'assert';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[];
  private _router = inject(Router);

  constructor() {
    this.items = [
      {
        label: 'Books',
        icon: 'pi pi-book',
        routerLink: '/dashboard',
        command: (event) => this.onMenuItemClick(event),
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/auth/sign-in',
        command: (event) => this.onMenuItemClick(event),
      },
      {
        label: 'Reservations',
        icon: 'pi pi-list',
        routerLink: '/dashboard/reservations',
        command: (event) => this.onMenuItemClick(event),
      },
    ];
  }

  onMenuItemClick(event: any) {
    console.log(event.item);

    this._router.navigateByUrl(event.item.routerLink);
  }
}
