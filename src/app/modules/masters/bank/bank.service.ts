import { Injectable } from '@angular/core';
import {ViewBankComponent} from '../bank/view-bank/view-bank.component';
import {Observable} from "rxjs";
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class BankService implements CanDeactivate<ViewBankComponent> {

  constructor() { }
  canDeactivate(component: ViewBankComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.bankForm.myForm.touched){
    alert(component.bankForm.myForm.touched);
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
