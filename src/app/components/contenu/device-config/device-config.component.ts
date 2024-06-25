import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Device } from 'src/app/_models/device';
import { AuthService } from 'src/app/_services/auth.service';
import { DeviceService } from 'src/app/_services/device.service';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DeviceConfigComponent implements OnInit {
  Devices: Device[] = [];
  loading: boolean = true;
  deviceDialog: boolean = false;
  device: Device = new Device();
  selectedDevices: Device[] = [];
  isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;
  countusers: number = 0;
  roles:any[]=['admin','user'];
  selectedRole : string = '';

  @ViewChild('dt') dt: Table | undefined;
  CongeService: any;

  constructor(
      private deviceService: DeviceService,
      private authService: AuthService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
   //   this.loadData();
      this.isAdmin = this.authService.isAdmin();
      this.getAll();

      // this.cols = [
      //     {
      //         field: 'name',
      //         header: 'Company Name',
      //         customExportHeader: 'name',
      //     },
         
      // ];

      // this.exportColumns = this.cols.map((col) => ({
      //     title: col.header,
      //     dataKey: col.field,
      // }));
  }

  getAll() {
      this.deviceService.getAllDevices().subscribe(
          (r) => {
              this.Devices = r;
              console.table(this.Devices);
              this.loading = false;
          },
          (e) => {
              console.error(e);
          }
      );
  }

  openNew() {
      this.device = new Device();
      this.loading = false;
      this.deviceDialog = true;
  }

  loadData() {
      this.deviceService.getAllDevices().subscribe({
          next: (res) => {
              this.Devices = res.data;
          },
          error: (err) => {
              console.error(err);
          },
      });
  }

  

  deleteSelectedDevices() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected Devices?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              for (let i = 0; i < this.selectedDevices.length; i++) {
                  const device = this.selectedDevices[i];
                  this.deviceService.removeDevice(device.id!).subscribe({
                      next: (res) => {
                          this.Devices = this.Devices.filter(
                              (val) => val.id !== device.id
                          );
                      },
                  });
              }
              this.Devices = this.Devices.filter(
                  (val) => !this.selectedDevices.includes(val)
              );
              this.selectedDevices = [];
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'devices Deleted',
                  life: 3000,
              });
          },
      });
  }

  editDevice(device: Device) {
      this.device = { ...device };
      this.deviceDialog = true;
  }

  deleteDevice(device: Device) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + device.deviceRef + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.deviceService.removeDevice(device.id!).subscribe({
                  next: (res) => {
                      this.Devices = this.Devices.filter(
                          (val) => val.id !== device.id
                      );
                      console.log(res);
                  },
              });
          },
      });
  }

  hideDialog() {
      this.deviceDialog = false;
      this.loading = false;
  }

  saveDevice() {
      this.loading = true;
      if (this.device.id) {
          this.deviceService.updateDevice(this.device).subscribe((r) => {
              console.log(r);
          });
          this.Devices[this.findIndexById(this.device.id)] = this.device;
          this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Device Updated',
              life: 3000,
          });
      } else {
          this.deviceService.addDevice(this.device).subscribe((r) => {
              this.Devices.push(r);
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Device Created',
                  life: 3000,
              });
              ('');
          });
      }

      this.Devices = [...this.Devices];
      this.deviceDialog = false;
      this.device = new Device();
  }

  applyFilterGlobal($event: any, stringVal: any) {
      this.dt!.filterGlobal(
          ($event.target as HTMLInputElement).value,
          stringVal
      );
  }

  findIndexById(id: number): number {
      let index = -1;
      for (let i = 0; i < this.Devices.length; i++) {
          if (this.Devices[i].id === id) {
              index = i;
              break;
          }
      }
      return index;
  }
}
