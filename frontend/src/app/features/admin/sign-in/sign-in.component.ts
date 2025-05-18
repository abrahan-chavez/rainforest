import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  email = model<string>('');
  password = model<string>('');

  router = inject(Router);

  valid() {
    return this.email().length > 0 && this.password().length > 0;
  }

  signin() {
    if (this.valid()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
