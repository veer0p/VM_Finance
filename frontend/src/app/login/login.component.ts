import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Import required modules

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;

    this.http.post('http://localhost:5000/api/auth/login', formData).subscribe(
      (response: any) => {
        debugger;
        if (response.token) {
          // ✅ If token is received, user is authenticated → Go to dashboard
          localStorage.setItem('token', response.token);
        } else {
          debugger;
          // ✅ If 2FA is required, go to OTP Verification
          this.router.navigate(['/otp-verification'], {
            queryParams: { email: formData.email },
          });
        }
        debugger;
      },
      (error) => {
        alert('Login failed!');
        console.error(error);
      }
    );
  }
}
