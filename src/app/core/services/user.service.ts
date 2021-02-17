import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    get() {
        return this.http.get<User[]>(`${environment.Endpoint}/user`);
    }

    getUserById(id: String): Observable<User>{
        const url = `${environment.Endpoint}/user/${id}`;
		return this.http.get<User>(url);
    }
    
    get UserInfo():User{
        let user = localStorage.getItem('user');
        if(!user){
            return new User();
        }
        return JSON.parse(user);
    }
}