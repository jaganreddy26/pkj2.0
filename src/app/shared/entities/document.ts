export class DocumentFiles {
    EntityCategory:string = 'Master';
    Entity:string;
    BusinessId:string;
    BusinessName:string;
    CompanyId:string;
    CompanyName:string;
    EntityParent:string;
    EntityType:any;
    DocumentType:string;
    BusinesTypes:string;
    EntityName:string;
    ControlId:string;
    FilesCount:number=1;
    FileDetails:any= new FileDetails();

   
}
export class FileDetails {
    FilePath:string;
    EncryptedFile:any;
    FileExtn:string;
    UploadedFileName:string;
}

