import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ResetpasswordComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.resetPassword(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        console.log(response);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset successfully',
        });

        // Redirect to the login page after successful password reset
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(error);
        if (error.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User not found',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred. Please try again later.',
          });
        }
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
}
