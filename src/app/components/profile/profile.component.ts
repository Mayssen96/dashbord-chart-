import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';


import { UserService } from 'src/app/_services/users.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class ProfileComponent implements OnInit {
    user: User = new User();
    password: string = "";
    isAdmin: boolean = false;
    soldeConge: number = 0;
    dialog: boolean = false;
    stateOptions: any[] = [];
    
    cantRequestConversion: boolean = true;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private messageService: MessageService,


    ) {}

    ngOnInit(): void {
        
        this.isAdmin = this.authService.isAdmin();
        
    }

    saveUser() {
        if (this.user.id) {
            this.userService.updateUser(this.user).subscribe((r) => {
               // console.log(r.password);
            });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Modification enregistrée',
                life: 3000,
            });
        }
    }

    saveUserPassword() {
        if (this.user.id) {
            this.userService
                .updateUserPassword(this.user, this.password)
                .subscribe((r) => {
                    console.log(r.password);
                });
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Modification enregistrée',
                life: 3000,
            });
        }
    }

    showDialog() {
        this.dialog = true;
    }

    hideDialog() {
        this.dialog = false;
    }

    
}