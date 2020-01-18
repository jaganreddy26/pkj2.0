import { Injectable } from '@angular/core';
import {ViewBusinessComponent} from '../business/view-business/view-business.component';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor() { }
  canDeactivate(component: ViewBusinessComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.businessForm.myForm.touched){
    if (confirm('Do you want to save changeses') == true) 
        return component.saveChanges(); 
    else { 
    return component.discardChanges()  
  }
  }else{
    return true
  }

}

}
