import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Import required modules
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent {
  otpForm: FormGroup;
  email: string = '';
  otp: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.otpForm = this.fb.group({
      otp: [''],
    });

    // ✅ Get Email from Query Params
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  onSubmit() {
    const formData = {
      email: this.email,
      otp: this.otpForm.value.otp,
    };

    this.http
      .post('http://localhost:5000/api/auth/verify-otp', formData)
      .subscribe(
        (response: any) => {
          alert('OTP Verified Successfully!');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']); // ✅ Redirect to Dashboard
        },
        (error) => {
          alert('Invalid OTP!');
          console.error(error);
        }
      );
  }
}
