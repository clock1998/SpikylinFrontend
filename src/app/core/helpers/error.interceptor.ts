import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { BadInput } from 'src/app/shared/errors/bad-input-erorr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
                // this.authenticationService.refresh().subscribe();
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
                alert("Session Expired!");
            }
            if(error.status === 404){
                return throwError(new NotFoundError());
            }
            if(error.status === 400){
                return throwError(new BadInput(error.error));
            }
            if(error.status === 0){
                return throwError(new AppError(error));
            }
            return throwError(new AppError(error));
        }))
    }
}