import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../../shared/models/image';
import { environment } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class GalleryService {
	galleryUrl: string = environment.apiEndpoint + '/gallery/';
	constructor(private http: HttpClient) {}

	getImages(): Observable<Image[]> {
		return this.http.get<Image[]>(this.galleryUrl);
	}

	uploadImage(formData): Observable<Image>{
		return this.http.post<any>(this.galleryUrl, formData);
	}
}
