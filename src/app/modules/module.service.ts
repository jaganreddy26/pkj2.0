import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
import { ViewAndUpdateCompanyComponent } from './company/view-and-update-company/view-and-update-company.component';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModuleService implements CanDeactivate<ViewAndUpdateCompanyComponent>{

  private host = environment.API_END_POINT;
  private url: string =  this.host+'MasterDataApi/GetMasterDataTree_SF';
   
  constructor(private http:HttpClient) { }

  getData(data,url)
  {
     this.url = this.host+url;
    return this.http.get(this.url,data)
  }
  save(data){
    return this.http.put(this.url,data)
  }
  postData(data,url)
  {
     this.url = this.host+url;
    return this.http.post(this.url,data)
  }
  getSingleData(data){
    return this.http.get(this.url+'/'+data)
  }
  canDeactivate(component: ViewAndUpdateCompanyComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.companyForm.myForm.touched || component.documentsForm.files.length != 0 || component.vendorForm.isChanged || component.customerForm.isChanged){
    if (confirm('Do you want to save changes') == true) 
        return component.saveChanges(); 
    else { 
        return component.discardChanges() 
  }
  }else{
    return true
  }

}
}
