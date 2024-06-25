export class Reservation {
    id?: number;
    nomformation!:string;
    date: Date;
    status!: string;
    details!:string;
    formationId!:number;
    userId!: number;


    constructor() {


      this.date = new Date();


    }
  }
