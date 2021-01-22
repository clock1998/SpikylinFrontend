import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            if (err.error!=null && err.error.code === 'token_not_valid') {
                // this.authenticationService.refresh().subscribe();
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                // location.reload(true);
            }
            if(err.error != null){
                return throwError(err.error);
            }
            else{
                return throwError(new Error());
            }
        }))
    }
}