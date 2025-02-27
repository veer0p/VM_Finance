import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ConfirmPasswordComponent {
  confirmPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.confirmPasswordForm = this.fb.group({
      newPassword: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    console.log('Password changed successfully');
    this.router.navigate(['/login']); // Redirect to login after reset
  }
}
