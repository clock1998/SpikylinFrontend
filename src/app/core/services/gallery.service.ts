import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../../shared/models/image';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class GalleryService {
	galleryUrl: string = 'http://127.0.0.1:8081/gallery';
	constructor(private http: HttpClient) {}

	getImages(): Observable<Image[]> {
		return this.http.get<Image[]>(this.galleryUrl);
	}
}
