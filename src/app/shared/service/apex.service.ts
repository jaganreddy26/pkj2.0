import { Injectable, Output, EventEmitter, Component } from '@angular/core';//injectable represents it is a service
import { Observable } from 'rxjs';//observable from rxjs
import { DomSanitizer } from '@angular/platform-browser';//bypassSecurityTrust
import { Storage } from '../utils/storage';
import {MatSnackBar} from '@angular/material';
//service decorator
@Injectable()
export class ApexService {
    alerts: any = [];
     sessionUserEvent: EventEmitter<any>  = new EventEmitter( );
     menuEvent:  EventEmitter<any>  = new EventEmitter( );
     loaderEvent: EventEmitter<any>  = new EventEmitter( );
     contactEvent: EventEmitter<any>  = new EventEmitter( );
    constructor(private _domSanitizer: DomSanitizer,private snackBar:MatSnackBar){
    }
    showMessage(message: string,action:any){
        this.snackBar.open(message, action, {
            duration: 6000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
    }
    
     showLoader(show: Boolean) {
             this.loaderEvent.next(show);      
    }
    load(){
        this.loaderEvent.next(false);
    }

   sessionUserEmit (sessionUser: any) {
       Storage.setSessionUser(sessionUser);
        this.sessionUserEvent.emit(sessionUser);
    }
    menuEmit(menu: any){
         this.menuEvent.emit(menu);
    }
    bypassURL(url: string){
        return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}