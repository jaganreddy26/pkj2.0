import { Injectable } from '@angular/core';
import {ViewAgencyComponent} from '../agency/view-agency/view-agency.component';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor() { }
  canDeactivate(component: ViewAgencyComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.agencyForm.myForm.touched){
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

