export class DocumentFiles {
    EntityCategory:string = 'Master';
    Entity:string;
    BusinessId:string;
    BusinessName:string;
    CompanyId:string;
    CompanyName:string;
    EntityParent:string;
    Type:string;
    EntityId:string;
    ControlId:string;
    FilesCount:number=1;

     //below ranga addeed

     EntityType:string;
     EntityName:string;
     DocumentType:string;
     BusinesTypes:string
     //upto here
    FileDetails:any= new FileDetails();

   
}
export class FileDetails {
    FilePath:string;
    EncryptedFile:any;
    FileExtn:string;
    UploadedFileName:string;
}