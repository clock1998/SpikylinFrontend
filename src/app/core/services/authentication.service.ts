import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {

    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiEndpoint}/token`, { username, password })
            .pipe(map(res => {
                localStorage.setItem('access_token', res.access_token);
                let jwtDecoded = this.getDecodedAccessToken(res.access_token);
                localStorage.setItem('user_id',jwtDecoded.id);
                localStorage.setItem('exp',jwtDecoded.exp);
                console.log(jwt_decode(res.access_token));
                // localStorage.setItem('refresh_token', res.refresh);
            }));
    }

    refresh() {
        return this.http.post<any>(`${environment.apiEndpoint}/auth/jwt/refresh/`, {refresh:this.getAccessToken()})
            .pipe(map(res => {
                localStorage.setItem('access_token', res.access_token);
            }));
    }

    logout() {
        localStorage.clear();
        // remove user from local storage to log user out
    }

    getAccessToken(){
        return localStorage.getItem('access_token');
    }

    getRefreshToken(){
        return localStorage.getItem('refresh_token');
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return (authToken !== null) ? true : false;
    }

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(this.getAccessToken());

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refresh().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}