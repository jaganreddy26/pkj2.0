import { Injectable,EventEmitter } from "@angular/core"; //injectable represents the service
import { HttpClient } from "@angular/common/http"; //todo http calls
import { map } from "rxjs/operators"; //to mapping the data
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router"; //for navigate the pages
import { Storage } from "../utils/storage"; //to store the data
import { ApexService } from "./apex.service"; //own service for loader
import { CanActivate } from "@angular/router";
import { environment } from "../../../environments/environment";


@Injectable()
export class AppService {
  sessionUser: any;
 public businessId:any='A'
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private apexService: ApexService
  ) {}
  navigate(url: String, params: any) {
    if (params) {
      let param: any = {};
      if (params instanceof Array) {
        for (let i = 0; i < params.length; i++) {
          for (let key in params[i]) {
            param[key] = params[i][key];
          }
        }
      } else {
        param = params;
      }

      let navigationExtras: NavigationExtras = {
        queryParams: param
      };
      this.router.navigate([url], navigationExtras);
    } else {
      this.router.navigate([url]);
    }
  }
  //to get the id from the router
  getParam(key: string) {
    return this.route.snapshot.queryParams[key];
  }
  isAccess(path: String) {
    return true;
  }

  //isAccess(path: String){
  //    let returnValue = false;
  //    for(let menu of Util.RoleMenu()){
  //        if(menu.link.toLowerCase() == path.toLowerCase()) {
  //            returnValue =  true;
  //            break;
  //        }
  //    }
  //    return returnValue;
  //}
  //storages
  
  getLocalItem(key: string) {
    return Storage.getLocalItem(key);
  }
  setLocalItem(key: string, value: any) {
    return Storage.setLocalItem(key, value);
  }
  getSessionItem(key: string) {
    return Storage.getSessionItem(key);
  }
  setSessionItem(key: string, value: any) {
    return Storage.setSessionItem(key, value);
  }
  showLoader(show: boolean) {
    this.apexService.showLoader(show);
  }
  showMessage(message: string, action: any) {
    this.apexService.showMessage(message, action);
  }
  sessionUserEmit(data: any) {
    this.apexService.sessionUserEmit(data);
  }
  menuEmit(data: any) {
    this.apexService.menuEmit(data);
  }
  getBranch(): any {
    return Storage.getBranch();
  }

  getSessionUser() {
    return Storage.getSessionUser();
  }
  sessionClear() {
    Storage.clearSession();
  }
  canActivate() {
    this.sessionUser = localStorage.getItem('login')
    if (this.sessionUser) {
      return true;
    } else {
      this.navigate("", []);
      alert('Please Login')
      return false;
    }
  }

}
