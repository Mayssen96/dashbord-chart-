import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/users.service';
import 'jspdf-autotable';
import { WorkBook, read, utils } from 'xlsx';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CalendrierService } from 'src/app/_services/calendrier.service';



@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
  providers: [DatePipe, MessageService],
})
export class CalendrierComponent implements OnInit {
    newEventDescription: string = '';
    eventToDelete: any = null;
    events: EventInput[] = [];
    calendarOptions: CalendarOptions = {
        locale: frLocale,
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        height: '45rem',
        firstDay: 1,
        eventClick: (info) => {
            this.handleEventClick(info);
        },
        eventMouseEnter: (info) => {
            this.handleEventMouseEnter(info);
        },
        eventMouseLeave: (info) => {
            this.handleEventMouseLeave(info);
        },
        weekends: false,
        weekNumbers: true, //Nombre de semaine par rapport à l'année
        weekText: 'Semaine ',
        weekNumberCalculation: 'ISO', //Pour commencer à compter à partir du lundi
        displayEventTime: false,
    };

    employees: User[] = [];
    selectedEmployee!: User;
    editing: boolean = false;
    dialog: boolean = false;
    minDate: Date = new Date();
    rangeDates: Date[] = [];
    isAdmin: boolean = false;



    jsPDF: any;
    @ViewChild('fubauto') fubauto: FileUpload | undefined;

    constructor(
        private calendrierService: CalendrierService,
        private userService: UserService,
        private datePipe: DatePipe,
        private authService: AuthService,
        private messageService: MessageService,

    ) {}

    ngOnInit(): void {
        this.checkRole();
        this.userService.getAllusers().subscribe((r) => {
            this.employees = r;
        });

    }





    handleDateClick(arg: any) {
        console.log('date click! ' + arg.dateStr);
    }

    handleEventClick(arg: any) {
        if (this.isAdmin && arg.event._def.interactive) {


            this.editing = true;
            this.dialog = true;
        }
    }

    handleEventMouseEnter(arg: any) {
        if (arg.event._def.interactive) {
            arg.el.style.backgroundColor = 'blueviolet';
        }
    }

    handleEventMouseLeave(arg: any) {
        if (arg.event._def.interactive) {
            arg.el.style.backgroundColor = '#4F46E5';
        }
    }






    openNew() {

        this.editing = true;
        this.dialog = true;
    }

    hideDialog() {
        this.dialog = false;
        this.editing = false;
    }

    saveEntry() {


    }

    checkRole() {
        this.isAdmin = this.authService.isAdmin();

        if (!this.isAdmin) {
            this.userService.getCurrentUser().subscribe({
                next: (r) => {
                    this.selectedEmployee = r;
                    this.getUserCalendar(this.selectedEmployee.id!);
                },
            });
        }
    }

    getUserCalendar(id: number) {
        this.events = [];



    }



    onUpload($event: any) {
        let reader = new FileReader();
        let workbook: WorkBook;


        this.fubauto?.clear();
    }

    createAlert(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: detail,
            life: 5000,
        });
    }

    dateRangeControl() {
        if (this.rangeDates[0] != null) {
            this.rangeDates[1] = new Date(this.rangeDates[0]);
            this.rangeDates[1].setDate(this.rangeDates[1].getDate() + 4);
        }
        if (!this.rangeDates.some((el) => el == null)) {
            const dates: Date[] = this.getDatesFromRange(
                this.rangeDates[0],
                this.rangeDates[1]
            );
            let chosenDate: Date = this.rangeDates[1];
            for (let i = 0; i < dates.length; i++) {
                const date = dates[i];
                if (date.getDay() == 6) {
                    chosenDate = dates[i - 1];
                    break;
                }
            }
            this.rangeDates[1] = chosenDate!;
        }


    }

    getDatesFromRange(start: Date, end: Date) {
        const cFrom = new Date(start);
        const cTo = new Date(end);
        let daysArr = [new Date(cFrom)];
        let tempDate = cFrom;
        while (tempDate < cTo) {
            tempDate.setUTCDate(tempDate.getUTCDate() + 1);
            daysArr.push(new Date(tempDate));
        }
        return daysArr;
    }

    updateMinDate(date: Date) {
        this.minDate = date;

    }

    toggleWeekends() {
        this.calendarOptions.weekends = !this.calendarOptions.weekends;
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].id === id.toString()) {
                index = i;
                break;
            }
        }
        return index;
    }
    
}

