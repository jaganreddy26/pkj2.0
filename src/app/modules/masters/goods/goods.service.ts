import { Injectable } from '@angular/core';
import { ViewGoodsComponent } from './view-goods/view-goods.component';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor() { }
  canDeactivate(component: ViewGoodsComponent): Observable<boolean> | boolean{
    console.log(component)
  if(component.viewGoodsForm.myForm.touched){
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
 