import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/users.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    isVisualisation!:boolean;
    isTracabilite!:boolean;
    isTracabiliteMap!:boolean;
    isAnalyse!:boolean;
    isImport!:boolean;



    constructor(public layoutService: LayoutService , private authService:AuthService , private userService:UserService) {}

    ngOnInit() {
        // const id =this.authService.getId;
        // console.log('id',id)
        // this.userService.getUserById(3).subscribe(
        //     (r)=>{
        //         this.isVisualisation=r.visualisation;
        //         console.log('r.visualisation',r)
        //         console.log('this.isVisualisation',this.isVisualisation)
        //     }
        // )
        this.fetchUserData();
        const isAdmin = this.authService.isAdmin();
        const isAnalyse=this.authService.isAnalyse();
        const isTracabilite=this.authService.isTracabilite();
        const isTracabiliteMap=this.authService.isTracabiliteMap();
        const isVisualisation=this.authService.isVisualisation();
        const isImportCSV=this.authService.isimportCSV();
        // const isAnalyse=this.authService.isAnalyse();
        console.log('hfgfghfgtt',isVisualisation)
        this.model = [
            {
                label: 'Accueil',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Modules',
                items: [
                    // {
                    //     label: 'Events',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/events'],
                    // },
                    // {
                    //     label: 'Reservation',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/reservation'],
                    // },
                  
                    
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-user-edit',
                        routerLink: ['/contenu/utilisateurs'],
                    }//,
                    // {
                    //     label: 'Category',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/category'],
                    // },
                    // {
                    //     label: 'Themes',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/themes'],
                    // },
                    // {
                    //     label: 'Experiences',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/experiences'],   
                    // },

                    // {
                    //     label: 'Destination Category ',
                    //     icon: 'pi pi-fw pi-user-edit',
                    //     routerLink: ['/contenu/DestinationCategory'],   
                    // },

                ],
            },
        
        ];
    }
    private fetchUserData() {
        const userId = this.authService.getId;
        console.log('userId', userId);

        this.userService.getUserById(userId).subscribe((user) => {
          this.isVisualisation = user.visualisation;
          console.log('user', user);
          console.log('this.isVisualisation', this.isVisualisation);
        });
      }

}
