import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Role, User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/users.service';
import { formatDate } from '@angular/common';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { CompanyService } from 'src/app/_services/company.service';
import { forkJoin } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { NgModel } from '@angular/forms';
//import jsPDF from 'jspdf';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
    styleUrls: ['./utilisateurs.component.scss'],
    providers: [ConfirmationService, MessageService,DatePipe],
})

export class UtilisateursComponent implements OnInit {
    users: User[] = [];
    loading: boolean = true;
    userDialog: boolean = false;
    user: User = new User();
    selectedUsers: User[] = [];
    isAdmin: boolean = false;
    exportColumns: any[] | undefined;
    cols: any[] | undefined;
    countusers: number = 0;
    roles: any[] = ['admin', 'user'];
    selectedRole: Role | null = null;
    companyName: string = '';
    @ViewChild('dt') dt: Table | undefined;
    CongeService: any;
    currentUser: any;
  countries: string[] = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Australia', 'Brazil', 'India', 
  'China', 'Japan', 'Mexico', 'Russia', 'South Africa', 'Argentina', 'Netherlands', 'Sweden', 'Switzerland', 'Turkey', 
  'Portugal', 'Belgium', 'Norway', 'Denmark', 'Finland', 'Greece', 'Austria', 'Poland', 'Czech Republic', 'Hungary', 
  'Romania', 'Ukraine', 'Vietnam', 'Thailand', 'South Korea', 'Indonesia', 'Malaysia', 'Singapore', 'Tunisia', 
  // Add more countries here
];

statusTab:boolean[]=[true,false]
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private companyService: CompanyService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    
    roleOptions: string[] = ['admin', 'client'];

    validateCapitalized(control: NgModel): boolean {
        const value = control.value;
        return value && typeof value === 'string' && /^[A-Z]/.test(value);
      }
    ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();
        this.getAll();
        this.getCompany();
        this.cols = [
            {
                field: 'username',
                header: 'User Name',
                customExportHeader: 'username',
            },
            { field: 'email', header: 'Email' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastname', header: 'Last Name' },
            { field: 'phoneNumber', header: 'Phone Number' },
        ];

        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.currentUser = this.authService.getToken();
        console.log('this.currentUser', this.authService.getToken());
    }

    getAll() {
        this.userService.getAllusers().subscribe(
            (r) => {
                this.users = r;
                console.log(this.user.companyId);
                console.table(this.users);

                this.loading = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }

    getCompany() {
        this.companyService.getNameCompany(1).subscribe((res) => {
            this.companyName = res.name;
            console.log('this.companyName', this.companyName);
        });
    }

    openNew() {
        this.user = new User();
        this.loading = false;
        this.userDialog = true;
    }

    loadData() {
        this.userService.getAllusers().subscribe({
            next: (res) => {
                this.users = res;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    ExportPDF() {
        this.userService.getUserCount().subscribe((r: number) => {
            this.countusers = r;
            let doc = new jsPDF.default('l', 'pt');
            var img = new Image();
            img.src = 'assets/images/HR1.png';
            doc.addImage(img, 'png', 100, 20, 100, 100);
            doc.setTextColor(0, 0, 139);
            var date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
            doc.text(600, 70, 'HR.TN');
            doc.text(600, 90, ' ' + date);
            doc.text(600, 110, 'Total des Utilisateurs est ' + this.countusers);
            doc.text(110, 110, 'HR.TN');
            doc.setTextColor(255, 0, 0);
            doc.setFontSize(20);
            doc.setFont('bold');
            doc.text(320, 130, 'Liste des Utilisateurs\n');
            doc.autoTable(this.exportColumns, this.users, {
                theme: 'grid',
                styles: {
                    halign: 'left',
                },
                margin: {
                    top: 180,
                },
            });
            doc.setTextColor(0, 0, 0);
            doc.save('Utilisateurs_' + new Date().getTime() + '.pdf');
        });
    }

    exportexcell(exportColumns: any) {
        const replacer = (key: any, value: null) =>
            value === null ? '' : value;
        const header = Object.keys(exportColumns[0]);
        let csv = exportColumns.map((row: { [x: string]: any }) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join(',')
        );
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
        var blob = new Blob([csvArray], { type: 'text/csv' });
        saveAs(blob, 'Utilisateurs_' + new Date().getTime() + '.csv');
    }

    savecsv(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
        console.log(user);
    }

    deleteUser(user: User) {
        if (user.id !== undefined) {
            this.userService.removeUser(user).subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000,
                    });
                },
                (error) => {
                    console.error('Error deleting user:', error);
                }
            );
        } else {
            console.error('User ID is undefined, cannot delete user.');
        }
    }

    hideDialog() {
        this.userDialog = false;
        this.loading = false;
    }

    saveUser() {
        console.log(this.user)
        this.loading = true;

        if (this.user.id !== undefined && this.user.id !== null) {
            this.userService.updateUser(this.user).subscribe(
                (r) => {
                    const index = this.findIndexById(this.user.id!);
                    if (index !== -1) {
                        this.users[index] = this.user;
                    }
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Updated',
                        life: 3000,
                    });
                    this.users = [...this.users];
                    this.userDialog = false;
                    this.user = new User();
                    this.loading = false;
                },
                (error) => {
                    console.error('Error updating user:', error);
                    this.loading = false;
                }
            );
        } else {
            this.userService.addUser(this.user).subscribe(
                (r) => {
                    this.users.push(r);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Created',
                        life: 3000,
                    });
                    this.users = [...this.users];
                    this.userDialog = false;
                    this.user = new User();
                    this.loading = false;
                },
                (error) => {
                    console.error('Error adding user:', error);
                    this.loading = false;
                }
            );
        }
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        return this.users.findIndex((user) => user.id === id);
    }
}
