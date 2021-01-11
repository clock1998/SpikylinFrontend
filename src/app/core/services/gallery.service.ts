import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/shared/models/photo';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class GalleryService {
	galleryUrl: string = environment.apiEndpoint + '/gallery';
	constructor(private http: HttpClient) {}

	getImages(): Observable<Photo[]> {
		return this.http.get<Photo[]>(this.galleryUrl);
	}

	addImage(formData): Observable<Photo>{
        const url = `${this.galleryUrl}/`;
		return this.http.post<any>(url, formData);
    }
    
    updateImage(formData, id:string): Observable<Photo>{
        const url = `${this.galleryUrl}/${id}/`;
		return this.http.put<any>(url, formData);
    }

    updatePhotoInfo(formData, id:string): Observable<Photo>{
        const url = `${this.galleryUrl}/nofile/${id}/`;
		return this.http.put<any>(url, formData);
    }

    deleteImage(id:string):Observable<{}>{
        const url = `${this.galleryUrl}/${id}`;
        return this.http.delete(url);
    }
}
