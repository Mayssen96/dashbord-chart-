import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Formation } from 'src/app/_models/formation';
import { AuthService } from 'src/app/_services/auth.service';
import { FormationService } from 'src/app/_services/formation.service';
import { Reservation } from 'src/app/_models/reservation';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];
  loading: boolean = true;
  formationDialog: boolean = false;
  formation: Formation = new Formation();
  selectedFormations: Formation[] = [];
  isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private formationService: FormationService,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    // Add ReservationService to the constructor
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.getAll();

    this.cols = [
      { field: 'title', header: 'Formation Title', customExportHeader: 'title' },
      { field: 'startDate', header: 'Start Date', customExportHeader: 'startDate' },
      { field: 'endDate', header: 'End Date', customExportHeader: 'endDate' },
      { field: 'duration', header: 'Duration', customExportHeader: 'duration' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getAll() {
    this.formationService.getAllFormations().subscribe(
      (r) => {
        this.formations = r;
        console.table(this.formations);
        this.loading = false;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  openNew() {
    this.formation = new Formation();
    this.loading = false;
    this.formationDialog = true;
  }

  loadData() {
    this.formationService.getAllFormations().subscribe({
      next: (res) => {
        this.formations = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  calculateDuration(startDate: Date, endDate: Date): number {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  deleteSelectedFormations() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected formations?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = 0; i < this.selectedFormations.length; i++) {
          const formation = this.selectedFormations[i];
          this.formationService.removeFormation(formation.id!).subscribe({
            next: (res) => {
              this.formations = this.formations.filter(
                (val) => val.id !== formation.id
              );
            },
          });
        }
        this.formations = this.formations.filter(
          (val) => !this.selectedFormations.includes(val)
        );
        this.selectedFormations = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Formations Deleted',
          life: 3000,
        });
      },
    });
  }

  editFormation(formation: Formation) {
    this.formation = { ...formation };
    this.formationDialog = true;
  }

  deleteFormation(formation: Formation) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + formation.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.formationService.removeFormation(formation.id!).subscribe({
          next: (res) => {
            this.formations = this.formations.filter(
              (val) => val.id !== formation.id
            );
            console.log(res);
          },
        });
      },
    });
  }

  hideDialog() {
    this.formationDialog = false;
    this.loading = false;
  }

  validateDates(): boolean {
    const currentDate = new Date();
    const startDate = new Date(this.formation.startDate);
    const endDate = new Date(this.formation.endDate);

    if (startDate < currentDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Start date cannot be in the past',
        life: 3000,
      });
      return false;
    }

    if (endDate < startDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'End date cannot be before start date',
        life: 3000,
      });
      return false;
    }

    return true;
  }

  saveFormation() {
    this.loading = true;

    if (!this.validateDates()) {
      this.loading = false;
      return;
    }

    const formationToSave = { ...this.formation };

    if (typeof formationToSave.startDate === 'string') {
      formationToSave.startDate = new Date(formationToSave.startDate);
    }

    if (typeof formationToSave.endDate === 'string') {
      formationToSave.endDate = new Date(formationToSave.endDate);
    }

    if (formationToSave.id) {
      this.formationService.updateFormation(formationToSave).subscribe(
        (r) => {
          console.log(r);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Formation Updated',
            life: 3000,
          });
          this.loading = false;
          this.formation = new Formation();
          this.hideDialog();
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    } else {
      this.formationService.addFormation(formationToSave).subscribe(
        (r: Formation) => {
          this.formations.push(r);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Formation Created',
            life: 3000,
          });
          this.loading = false;
          this.formation = new Formation();
          this.hideDialog();
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  // reserve(formation: Formation) {
  //   const userId = this.authService.getCurrentUserId(); // Récupérer l'ID de l'utilisateur actuel depuis le service d'authentification
  //   const reservationData = new Reservation();
  //   reservationData.userId = userId;
  //   reservationData.date = new Date(); // Ou utilisez la date appropriée pour la réservation
  //   reservationData.status = 'Pending'; // Ou tout autre état initial
  //   reservationData.nomformation = formation.title; // Remplacez par le champ correct de votre formation
  
  //   // Envoyer la réservation au service
  //   this.formationService.reserve(reservationData).subscribe(
  //     (response: Reservation) => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Reservation Created',
  //         life: 3000,
  //       });
  //       this.getAll(); // Rafraîchir la liste des formations après la réservation
  //     },
  //     (error: any) => {
  //       console.error('Erreur lors de la création de la réservation :', error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error',
  //         detail: 'Error creating reservation',
  //         life: 3000,
  //       });
  //     }
  //   );
  // }
  
  


  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.formations.length; i++) {
      if (this.formations[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
