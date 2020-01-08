import { Injectable } from '@angular/core';
import {ViewServiceComponent} from '../service/view-service/view-service.component';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }
  canDeactivate(component: ViewServiceComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.viewServiceForm.myForm.touched){
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
