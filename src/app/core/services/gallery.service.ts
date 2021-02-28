import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/shared/models/photo';
import { Observable } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class GalleryService {
	galleryUrl: string = environment.Endpoint + '/gallery';
	constructor(private http: HttpClient) {}

	get(): Observable<Photo[]> {
        console.log((<any>this).constructor.name);
		return this.http.get<Photo[]>(this.galleryUrl);
	}

	create(formData): Observable<Photo>{
        const url = `${this.galleryUrl}/`;
		return this.http.post<any>(url, formData);
    }
    
    update(formData, id:string): Observable<Photo>{
        const url = `${this.galleryUrl}/${id}/`;
		return this.http.put<any>(url, formData);
    }

    updatePhotoInfo(formData, id:string): Observable<Photo>{
        const url = `${this.galleryUrl}/nofile/${id}/`;
		return this.http.put<any>(url, formData);
    }

    delete(id:string):Observable<{}>{
        const url = `${this.galleryUrl}/${id}`;
        return this.http.delete(url);
    }
}
