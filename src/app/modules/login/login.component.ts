import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/service/app.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  business:any=[];
  username:string;
  passwrod:string;
  businessId:any;
  TransporterID:any;
  loadingTransporter:any;
  UnloadingTransporter:any;
  constructor(private appService:AppService) { 
  // this.getBusines();
  
  }

  ngOnInit() {
   
    // this.logiinInService.getBusinessName().subscribe((data:any)=>{
    
    // })
  }
// getBusines(){
//   this.logiinInService.getBusinessName().subscribe((data: any) => {
//     this.business = data;
//     console.log(data)
//   })
// }


login(){
//   if(this.businessId){
//     this.logiinInService.login(this.username,this.passwrod).subscribe((data:any)=>{
//       localStorage.setItem('access_token',data.access_token)
//       localStorage.setItem('businessId',this.businessId)
//       let obj={
//         "CompanyId":this.businessId,
//          "Id":0
//       }
//       this.logiinInService.getAreaBusinessDetails(obj).subscribe((data:any)=>{
//          console.log(data);
      
//        this.TransporterID=data[0].Id;
//         console.log(this.TransporterID);
//       localStorage.setItem('TransporterID',this.TransporterID)
//        this.loadingTransporter=data[1].Id;
//      console.log(this.loadingTransporter);
//       localStorage.setItem('loadingTransporter',this.loadingTransporter)
//        this.UnloadingTransporter=data[2].Id;
//       console.log(this.UnloadingTransporter);
//       localStorage.setItem('UnloadingTransporter',this.UnloadingTransporter)
     
//       })
      this.appService.navigate('/operation',{})
//     })
   
  
//   }else{
//     this.alertService.alert(AlertType.Error,"Please Select Bussines Name");
//   }
  
}
}