import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/internal/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiEndpoint}/auth/users`);
    }

    getCurrentUser(){
        return this.http.get<User>(`${environment.apiEndpoint}/auth/users/me/`).pipe(map(res=>{
            localStorage.setItem('user_id', res.id);
            localStorage.setItem('user_name', res.username);
            localStorage.setItem('user_email', res.email);
        }));
    }

    get UserInfo():User{
        let userid:string = localStorage.getItem('user_id');
        let username:string = localStorage.getItem('user_name');
        let email:string = localStorage.getItem('user_email');
        let user:User = {id:userid, username:username , email:email};
        return user;
    }
}