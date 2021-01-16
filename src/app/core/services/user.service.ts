import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<User[]>(`${environment.Endpoint}/user`);
    }

    getUserById(id: String){
        const url = `${environment.Endpoint}/user/${id}`;
		return this.http.get<User>(url).pipe(map(res=>{
            localStorage.setItem('user_name', res.username);
            localStorage.setItem('user_created', res.created);
            localStorage.setItem('user_lastupdated', res.lastUpdated);
        }));;
    }
    
    get UserInfo():User{
        let userid:string = localStorage.getItem('user_id');
        let username:string = localStorage.getItem('user_name');
        let created:string = localStorage.getItem('user_created');
        let lastUpdated:string = localStorage.getItem('user_lastupdated');
        // let email:string = localStorage.getItem('user_email');
        let user:User = {id:userid, username:username, created:created, lastUpdated:lastUpdated };
        return user;
    }
}