import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../../shared/models/image';
import { environment } from '../../../environments/environment';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
    tagUrl: string = environment.apiEndpoint + '/tag';
    imageTagUrl: string = environment.apiEndpoint + '/tag/image';
	constructor(private http: HttpClient) {}

	getTags(): Observable<Tag[]> {
		return this.http.get<Tag[]>(this.tagUrl);
	}
    
    deleteTag(id:string):Observable<{}>{
        const url = `${this.tagUrl}/${id}`;
        return this.http.delete(url);
    }

    getImageTags(id:string): Observable<Tag[]> {
		return this.http.get<Tag[]>(this.tagUrl);
	}
    
    deleteImageTag(id:string):Observable<{}>{
        const url = `${this.tagUrl}/${id}`;
        return this.http.delete(url);
    }
}
