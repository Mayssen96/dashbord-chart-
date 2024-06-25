import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Company } from 'src/app/_models/company';
import { AuthService } from 'src/app/_services/auth.service';
import { CompanyService } from 'src/app/_services/company.service';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  loading: boolean = true;
  companyDialog: boolean = false;
  company: Company = new Company();
  selectedCompanies: Company[] = [];
  isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;
  countusers: number = 0;
  roles:any[]=['admin','user'];
  selectedRole : string = '';

  @ViewChild('dt') dt: Table | undefined;
  CongeService: any;

  constructor(
      private companyService: CompanyService,
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
              field: 'name',
              header: 'Company Name',
              customExportHeader: 'name',
          },
         
      ];

      this.exportColumns = this.cols.map((col) => ({
          title: col.header,
          dataKey: col.field,
      }));
  }

  getAll() {
      this.companyService.getAllcompanies().subscribe(
          (r) => {
              this.companies = r;
              console.table(this.companies);
              this.loading = false;
          },
          (e) => {
              console.error(e);
          }
      );
  }

  openNew() {
      this.company = new Company();
      this.loading = false;
      this.companyDialog = true;
  }

  loadData() {
      this.companyService.getAllcompanies().subscribe({
          next: (res) => {
              this.companies = res.data;
          },
          error: (err) => {
              console.error(err);
          },
      });
  }

  

  deleteSelectedCompanies() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected companies?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              for (let i = 0; i < this.selectedCompanies.length; i++) {
                  const company = this.selectedCompanies[i];
                  this.companyService.removeCompany(company.id!).subscribe({
                      next: (res) => {
                          this.companies = this.companies.filter(
                              (val) => val.id !== company.id
                          );
                      },
                  });
              }
              this.companies = this.companies.filter(
                  (val) => !this.selectedCompanies.includes(val)
              );
              this.selectedCompanies = [];
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Users Deleted',
                  life: 3000,
              });
          },
      });
  }

  editCompany(company: Company) {
      this.company = { ...company };
      this.companyDialog = true;
  }

  deleteCompany(company: Company) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + company.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.companyService.removeCompany(company.id!).subscribe({
                  next: (res) => {
                      this.companies = this.companies.filter(
                          (val) => val.id !== company.id
                      );
                      console.log(res);
                  },
              });
          },
      });
  }

  hideDialog() {
      this.companyDialog = false;
      this.loading = false;
  }

  saveCompany() {
      this.loading = true;
      if (this.company.id) {
          this.companyService.updateCompany(this.company).subscribe((r) => {
              console.log(r);
          });
          this.companies[this.findIndexById(this.company.id)] = this.company;
          this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Company Updated',
              life: 3000,
          });
      } else {
          this.companyService.addCompany(this.company).subscribe((r) => {
              this.companies.push(r);
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Company Created',
                  life: 3000,
              });
              ('');
          });
      }

      this.companies = [...this.companies];
      this.companyDialog = false;
      this.company = new Company();
  }

  applyFilterGlobal($event: any, stringVal: any) {
      this.dt!.filterGlobal(
          ($event.target as HTMLInputElement).value,
          stringVal
      );
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.companies.length; i++) {
          if (this.companies[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
