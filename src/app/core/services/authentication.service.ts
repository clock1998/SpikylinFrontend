import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private jwtHelper: JwtHelperService = new JwtHelperService();
    constructor(private http: HttpClient, private userService: UserService) {

    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.Endpoint}/token`, { username, password })
            .pipe(map(res => {
                localStorage.setItem('access_token', res.access_token);
                let userid = this.jwtHelper.decodeToken(this.getAccessToken()).id;
                this.userService.getUserById(userid).subscribe(user=>{
                    localStorage.setItem('user', JSON.stringify(user));
                });
                // console.log(jwt_decode(res.access_token));
                // localStorage.setItem('refresh_token', res.refresh);
            }));
    }

    refresh() {
        return this.http.post<any>(`${environment.Endpoint}/auth/jwt/refresh/`, {refresh:this.getAccessToken()})
            .pipe(map(res => {
                localStorage.setItem('access_token', res.access_token);
            }));
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    getAccessToken(){
        return localStorage.getItem('access_token');
    }

    getRefreshToken(){
        return localStorage.getItem('refresh_token');
    }

    isLoggedIn(): boolean {
        return !this.jwtHelper.isTokenExpired(this.getAccessToken());
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