import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience } from 'src/app/_models/experience';
import { ExperiencesService } from 'src/app/_services/experiences.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  experiences:Experience[]=[]
id!:number
experience!:Experience
constructor(private ar:ActivatedRoute,private experienceService : ExperiencesService){
    this.getExperiences()
    //this.getExperiencById()
    
  }
  ngOnInit(): void {
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
      this.experienceService.getExperienceById(this.id).subscribe({next:(data)=>
        this.experience=data
      });
      
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
