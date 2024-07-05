export class User {
    
    username!: string;
    password!: string;
    email!: string;
    firstName!: string;

    phoneNumber!: string;
    address!: string;
    blocked!: boolean;
    verificationCode!: string;
    verified!: boolean;
    roles!: Role[];
    companyId!:number;
    visualisation!:boolean;
    tracabilite!:boolean;
    tracabiliteMap!:boolean;
    analyse!:boolean;
    importCSV!:boolean;
    id!:number
  
    lastName!:string;
    birthDate!:Date;
    country!: string;
    role!:string;
    verificationToken!: string ;
    status: boolean=false;
    resetPasswordToken!:string;
    resetPasswordExpires!:Date;

}

export interface Role {
    id: number;
    name: string;
}


