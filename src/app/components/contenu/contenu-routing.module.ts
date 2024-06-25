import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CompanyComponent } from './company/company.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { FormationComponent } from './formation/formation.component';
import { UserFormationComponent } from './user-formation/user-formation.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ExperiencesComponent } from './experiences/experiences/experiences.component';




const routes: Routes = [
    
    { path: '', component: NotfoundComponent },
    {
        path: 'utilisateurs',
        component: UtilisateursComponent,
        canActivate: [AuthGuard],
        //data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'experiences',
        component: ExperiencesComponent,
        //canActivate: [AuthGuard],
        //data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'companies',
        component: CompanyComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'deviceConfig',
        component: DeviceConfigComponent,
        canActivate: [AuthGuard],
        data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'formation',
        component: FormationComponent,
        // canActivate: [AuthGuard],
        // data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'reservation',
        component: ReservationComponent,
        // canActivate: [AuthGuard],
        // data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'FormationUser',
        component: UserFormationComponent,
        // canActivate: [AuthGuard],
        // data: { role: 'ROLE_ADMIN' },
    },
    {
        path: 'calendrier',
        component: CalendrierComponent,
        // canActivate: [AuthGuard],
        // data: { role: 'ROLE_ADMIN' },
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContenuRoutingModule {}
