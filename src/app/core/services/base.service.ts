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
    BaseUrl: string = environment.apiEndpoint;
    Path: string  = '';
    protected _http: HttpClient;
	constructor(http: HttpClient) {
        this._http = http;
    }

	get(): Observable<T[]> {
        // console.log((<any>this).constructor.name);
		return this._http.get<T[]>(this.BaseUrl+this.Path);
	}

	create(data): Observable<T>{
        const url = `${this.BaseUrl+this.Path}`;
		return this._http.post<any>(url, data, httpOptions);
    }    

    update(data, id:string): Observable<T>{
        const url = `${this.BaseUrl+this.Path}/${id}`;
		return this._http.put<any>(url, data, httpOptions);
    }

    delete(id:string):Observable<{}>{
        const url = `${this.BaseUrl+this.Path}/${id}`;
        return this._http.delete(url);
    }
}
