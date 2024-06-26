import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ContenuRoutingModule } from './contenu-routing.module';
import { ContenuComponent } from './contenu.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DxButtonModule, DxChartModule, DxBarGaugeModule, DxPivotGridModule, DxCircularGaugeModule, DxTooltipModule, DxLinearGaugeModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';
import { ChartModule } from 'primeng/chart';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FileUploadModule } from 'primeng/fileupload';
import { CompanyComponent } from './company/company.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { MessageService, ToastService } from 'src/app/_services/toast.service';
import { FormationComponent } from './formation/formation.component';
import { UserFormationComponent } from './user-formation/user-formation.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AstucesComponent } from './astuces/astuces/astuces.component';
import { AstuceFormComponent } from './astuces/astuce-form/astuce-form.component';
import { AstuceDetailsComponent } from './astuces/astuce-details/astuce-details.component';
import { ExperiencesComponent } from './experiences/experiences/experiences.component';
import { ExperienceDetailsComponent } from './experiences/experience-details/experience-details.component';
import { EvenementsComponent } from './evenements/evenements/evenements.component';
import { EvenementsFormComponent } from './evenements/evenements-form/evenements-form.component';
import { EvenementsDetailsComponent } from './evenements/evenements-details/evenements-details.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DestinationCategoriesComponent } from './destination-categories/destination-categories.component';

// import { AnalyseComponent } from './analyse/analyse.component';



@NgModule({
    declarations: [
        ContenuComponent,
        UtilisateursComponent,
        CompanyComponent,
        DeviceConfigComponent,
        FormationComponent,
        ReservationComponent,
        UserFormationComponent,
        CalendrierComponent,
        AstucesComponent,
        AstuceFormComponent,
        AstuceDetailsComponent,
        ExperiencesComponent,
        ExperienceDetailsComponent,
        EvenementsComponent,
        EvenementsFormComponent,
        EvenementsDetailsComponent,
        DestinationCategoriesComponent,
        // AnalyseComponent,


    ],
    imports: [
        DxBarGaugeModule,
        DxChartModule,
        DxButtonModule,
        ConfirmPopupModule,
        InputNumberModule,
        CommonModule,
        ContenuRoutingModule,
        CommonModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        ToolbarModule,
        DialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        ChartModule,
        FullCalendarModule,
        CalendarModule,
        FileUploadModule,
        DxPivotGridModule,
        DxBarGaugeModule,
        DxCircularGaugeModule,
        DxTooltipModule,
        DxLinearGaugeModule,
        DxChartModule,
        DxSelectBoxModule,
        NgChartsModule,
        DxTagBoxModule,
        ToastModule,
        HttpClientModule,
        CalendarModule,
    ],
    providers:[ToastService , MessageService, DatePipe

    ]
})
export class ContenuModule {}
