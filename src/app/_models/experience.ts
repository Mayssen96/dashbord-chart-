export class Experience{
    _id!:number
    title!:string;
    description!:string;
    image!:string;
    idClient!:string;
    idCategory!:number
    cloudinary_id!:string
    likes!:{nb:number,id:string[]}
    unLikes!:{nb:number,id:string[]}
}