import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [``],
})
export class LoginComponent implements OnInit {
    msg!: 'error';
    loginForm!: FormGroup;
    formSubmitted: boolean = false;
    showPassword: boolean = false;
    isLoggedIn = false;
    isLoginFailed = false;
    roles: string[] = [];
    constructor(private router: Router, private s: AuthService ,private storageService: StorageService) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required,Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.roles = this.storageService.getUser().roles;
            console.log('this.isLoggedIn',this.isLoggedIn,'this.roles',this.roles)
          }
    }

    login() {
        this.formSubmitted = true;
        if (this.loginForm.invalid) {
            return alert('Please introduce your data');
        }
        this.s.signin(this.loginForm.value).subscribe(
            (response: any) => {
                // set the token in the localStorage
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('role', response.roles);
                localStorage.setItem('id',response.id);
                localStorage.setItem('tracabiliteMap',response.tracabiliteMap);
                localStorage.setItem('analyse',response.analyse);
                localStorage.setItem('visualisation',response.visualisation);
                localStorage.setItem('tracabilite',response.tracabilite);
                localStorage.setItem('importCSV',response.importCSV);
                console.log(response)
                // localStorage.setItem('visualisation',response.visualisation)
                this.s.updateLoggedInState(true);
                // redirect to dashboard
                this.router.navigateByUrl('/dashboard');
            },
            (error: any) => {
                console.log(error);
                this.s.updateLoggedInState(false);
                if (error.status === 404) {
                    alert('Cannot get data!');
                }
            }
        );
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    // Toggle password visibility
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
        const passwordInput = document.querySelector('input[name="password"]');
        if (passwordInput) {
            passwordInput.setAttribute('type', this.showPassword ? 'text' : 'password');
        }
    }
}
