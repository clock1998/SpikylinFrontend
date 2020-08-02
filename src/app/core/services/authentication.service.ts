import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {

    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiEndpoint}/auth/jwt/create/`, { username, password })
            .subscribe((res) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', res.access);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('access_token');
    }

    getAccessToken(){
        return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
      }
}