import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../data-access/auth.service';
import { StorageService } from '../../../shared/data-access/storage.service';
import { Session } from '../../../shared/data-access/auth-state.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CardModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export default class SignInComponent {
  private _authService = inject(AuthService);
  private _formBuilder = inject(FormBuilder);
  private _storage = inject(StorageService);
  private _router = inject(Router);

  form = this._formBuilder.group<LoginForm>({
    email: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this._authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response);
          this._router.navigateByUrl('/auth/profile');
        },
      });
    }
  }

  ngOnInit(): void {
    if (this._storage.get<Session>('session')?.access_token) {
      this._router.navigateByUrl('/auth/profile');
    }
  }
}
