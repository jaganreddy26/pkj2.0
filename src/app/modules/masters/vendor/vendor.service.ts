import { Injectable } from '@angular/core';
import {ViewVendorDetailsComponent} from '../vendor/view-vendor-details/view-vendor-details.component';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class VendorService {


  constructor() { }
  canDeactivate(component: ViewVendorDetailsComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.vedorForm.myForm.touched
    || component.documentsForm.files.length != 0
    || component.agencyForm.isChanged
    || component.bankForm.myForm
    || component.goodsForm.isChanged
    || component.serviceForm.isChanged){
    
    if (confirm('Do you want to save changes') == true) 
       return component.saveChanges(); 
    else { 
        return component.discardChanges() 
  }
  }else{
    return true;
  }
}
}
