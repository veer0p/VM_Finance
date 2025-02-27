import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class OtpVerificationComponent {
  otpForm: FormGroup;
  source: string | null = null; // Track whether user came from forgot-password or login

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.otpForm = this.fb.group({
      otp: [''],
    });

    // Get source from query params
    this.route.queryParams.subscribe((params) => {
      this.source = params['source'] || 'login'; // Default to login if not provided
    });
  }

  onSubmit() {
    console.log('OTP verified successfully');

    if (this.source === 'forgot-password') {
      this.router.navigate(['/confirm-password']); // Redirect to confirm password page
    } else {
      this.router.navigate(['/home']); // Redirect to home page
    }
  }
}
