import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Reservation } from 'src/app/_models/reservation';
import { AuthService } from 'src/app/_services/auth.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ReservationComponent implements OnInit {
    reservations: Reservation[] = [];
    loading: boolean = true;
    reservationDialog: boolean = false;
    reservation: Reservation = new Reservation();
    selectedreservations: Reservation[] = [];
    isAdmin: boolean = false;
    exportColumns: any[] | undefined;
    cols: any[] | undefined;
    countavis: number = 0;
    roles:any[]=['admin','user'];
    selectedRole : string = '';

    @ViewChild('dt') dt: Table | undefined;
    CongeService: any;

    constructor(
        private reservationService : ReservationService,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
     //   this.loadData();
        this.isAdmin = this.authService.isAdmin();
        this.getAll();

        this.cols = [
            {
                field: 'commentaire',
                header: 'Commentaire',
                customExportHeader: 'commentaire',
            },
            { field: 'date', header: 'Date' },
            { field: 'status', header: 'Status' },

        ];

        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
    }

    getAll() {
        this.reservationService.getAllReservations().subscribe(
            (r) => {
                this.reservations = r;
                console.table(this.reservations);
                this.loading = false;
            },
            (e) => {
                console.error(e);
            }
        );
    }

    openNew() {
        this.reservation = new Reservation();
        this.reservation.status = "En cours";
        this.loading = false;
        this.reservationDialog = true;
    }

    loadData() {
        this.reservationService.getAllReservations().subscribe({
            next: (res) => {
                this.reservations = res.data;
            },
            error: (err) => {
                console.error(err);
            },
        });
    }



    deleteSelectedreclamation() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected reservation?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                for (let i = 0; i < this.selectedreservations.length; i++) {
                    const reservation = this.selectedreservations[i];
                    this.reservationService.removeReservation(reservation.id!).subscribe({
                        next: (res) => {
                            this.reservations = this.reservations.filter(
                                (val) => val.id !== reservation.id
                            );
                        },
                    });
                }
                this.reservations = this.reservations.filter(
                    (val) => !this.selectedreservations.includes(val)
                );
                this.selectedreservations = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'reservation Deleted',
                    life: 3000,
                });
            },
        });
    }

    editreservation(reservation: Reservation) {
        this.reservation = { ...reservation };
        this.reservationDialog = true;
    }

    deletereservation(reservation: Reservation) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + reservation.nomformation + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.reservationService.removeReservation(reservation.id!).subscribe({
                    next: (res) => {
                        this.reservations = this.reservations.filter(
                            (val) => val.id !== reservation.id
                        );
                        console.log(res);
                    },
                });
            },
        });
    }

    hideDialog() {
        this.reservationDialog = false;
        this.loading = false;
    }

    savereservation() {
        this.loading = true;
        if (this.reservation.id) {
            this.reservationService.updateReservation(this.reservation).subscribe((r) => {
                console.log(r);
            });
            this.reservations[this.findIndexById(this.reservation.id)] = this.reservation;
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'reservation Updated',
                life: 3000,
            });
        } else {
            this.reservationService.addReservation(this.reservation).subscribe((r) => {
                this.reservations.push(r);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'reservation Created',
                    life: 3000,
                });
                ('');
            });
        }

        this.reservations = [...this.reservations];
        this.reservationDialog = false;
        this.reservation = new Reservation();
    }

    applyFilterGlobal($event: any, stringVal: any) {
        this.dt!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.reservations.length; i++) {
            if (this.reservations[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
  }
