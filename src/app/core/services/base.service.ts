import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})

export class BaseService <T> {
    protected _baseUrl: string = environment.Endpoint;
    protected _path: string  = '';
	constructor(protected _http: HttpClient) {
    }
    get(): Observable<T[]>{
        return this._http.get<T[]>(this._baseUrl+this._path);
    }

	getById(id:string): Observable<T>{
        // console.log((<any>this).constructor.name);
        if(id != null){
            return this._http.get<any>(this._baseUrl+this._path+`/${id}`);
        }
    }
    
	create(data): Observable<T>{
        const url = `${this._baseUrl+this._path}`;
		return this._http.post<any>(url, data, httpOptions);
    }    

    update(data, id:string): Observable<T>{
        const url = `${this._baseUrl+this._path}/${id}`;
		return this._http.put<any>(url, data, httpOptions);
    }

    delete(id:string):Observable<{}>{
        const url = `${this._baseUrl+this._path}/${id}`;
        return this._http.delete(url);
    }
}
