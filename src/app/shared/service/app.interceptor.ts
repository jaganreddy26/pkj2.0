import { Injectable } from "@angular/core"; //injectable represents it is a service
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http"; //to do http calls we have import this one
import { ApexService } from "./apex.service"; //it is own service form the loader
import { Observable } from "rxjs"; // it is a observable
import { environment } from "../../../environments/environment";
import { Storage } from "../utils/storage";
import { AppService } from "./app.service";
import { throwError, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  // CONTENT_TYPE = 'application/x-www-form-urlencoded';
  CONTENT_TYPE = "application/json"; //content type of the api should be json
  content = null;
 // private host = environment.API_END_POINT;
  sessionUser: any;
  error: any;
  constructor(
    private apexService: ApexService
  ) {
    this.sessionUser = Storage.getSessionUser();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        //headers in http request
        "Content-Type": this.CONTENT_TYPE,
        Authorization: `jwt ${localStorage.getItem("access_token")}`
      }
      
    });
    this.apexService.showLoader(true);
    return next.handle(request).pipe(
      map((resp: HttpResponse<any>) => {
        if (resp && resp.type == 4) {
          this.apexService.showLoader(false);
          if (resp.body) {
            if (resp.body.status == 1) {
              return resp.clone({
                body: resp.body.data
              });
            } else if (resp.body.status == 0) {
              this.openSnackBar(
                resp.body.error ? resp.body.error : resp.body.data,'X'
              );
              return null;
            } else {
              return resp;
            }
          } else {
            return resp;
          }
        } else {
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.apexService.showLoader(false);
          console.log(err);
          if (err.status === 401) {
          } else {
          }
        } else {
          this.apexService.showLoader(false);
          if (err.status === 401) {
            this.openSnackBar("Unauthorised", "X");
          }
        }

        return EMPTY;
      })
    ) as any;
  }

  public getToken(): string {
    return Storage.getJWT();
  }
  openSnackBar(message: string, action: string) {
  }

}
