import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'jspdf-autotable';
import { Experience } from 'src/app/_models/experience';
import { ExperiencesService } from 'src/app/_services/experiences.service';
import Swal from 'sweetalert2';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';
import { CategoryDestinationService } from 'src/app/_services/category-destination.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ExperiencesComponent implements OnInit {

  experiences:Experience[]=[]
  id!:number
  
  user!:string
  category!:string
  loading: boolean = true;
  experience: Experience = new Experience();
  userDialog: boolean = false;
  //isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;
  countusers: number = 0;
  roles:any[]=['admin','user'];
  // selectedRole : string = '';
  //selectedRole: Role | null = null;
  // companyName: string='';
  @ViewChild('dt') dt: Table | undefined;
  //CongeService: any;
  currentUser:any;

  constructor(private ar:ActivatedRoute,private experienceService : ExperiencesService,private userService:UserService,private categoryService:CategoryDestinationService){}
  
  ngOnInit(): void {
    this.getExperiences()
    this.getExperiencById() 
    
    this.cols = [
      {
          field: 'title',
          header: 'Title',
          customExportHeader: 'title',
      },
      { field: 'idClient', header: 'Client' },
      { field: 'idCategory', header: 'Category' },
      { field: 'description', header: 'Description' },
      { field: 'image', header: 'Image' },
  ];

  this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
  }));
  }

getExperiences(){
    this.experienceService.getExperinces().subscribe({
      next:(data)=>{
        this.experiences=data
        console.log(this.experiences);
        
      }
    });
  }
  

  getExperiencById(){
    this.id = this.ar.snapshot.params['id'];
      this.experienceService.getExperienceById(this.id).subscribe({next:(data)=>{
        this.experience=data
        this.userService.getUserById(data.idClient).subscribe({
        next:(data)=>{
          this.user=data.firstName+' '+data.lastName
          console.log(this.user);
          
        }  
        })
        this.categoryService.getCategoriyById(data.idCategory).subscribe({
          next:(data)=>{
            this.category=data.name
            console.log(this.category);
          }  
          })
      }
        
      });
      
  }
  detailsExperience(experience: Experience) {
    this.experience = { ...experience };
    this.userDialog = true;
    console.log(experience)
    this.experienceService.getExperienceById(experience._id).subscribe({next:(data)=>{
      this.experience=data
      this.userService.getUserById(data.idClient).subscribe({
      next:(data)=>{
        this.user=data.firstName+' '+data.lastName
        console.log(this.user);
        
      }  
      })
      this.categoryService.getCategoriyById(data.idCategory).subscribe({
        next:(data)=>{
          this.category=data.name
          console.log(this.category);
        }  
        })
    }
      
    });
}
hideDialog() {
  this.userDialog = false;
  this.loading = false;
}
deleteExperience(id:number){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't delete this experience!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "green",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete!",
        allowOutsideClick:false,
        allowEscapeKey:false
      }).then((result) => {
        if (result.isConfirmed) {
          this.experienceService.deleteExperience(id).subscribe({
            next:()=>{
              Swal.fire({
              title: "Deleted!",
              text: "Your experience has been deleted.",
              icon: "success",
              timer: 3000,
              allowOutsideClick:false,
              allowEscapeKey:false
            }),
            this.experiences = this.experiences.filter((e)=>e._id != id)
          },
            error:()=>Swal.fire({
              title:"error",
              icon: "error",
              html: "Error whene deleting Experience  !",
              timer: 3000,
            })
          })
        }
      });
  }


}