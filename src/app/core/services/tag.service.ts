import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
    tagUrl: string = environment.apiEndpoint + '/ImageTag';
	constructor(private http: HttpClient) {}

    createTag(formData): Observable<Tag>{
        const url = `${this.tagUrl}/`;
        return this.http.post<Tag>(url,formData);
    }

	getTags(): Observable<Tag[]> {
		return this.http.get<Tag[]>(this.tagUrl);
	}
    
    deleteTag(id:string):Observable<{}>{
        const url = `${this.tagUrl}/${id}`;
        return this.http.delete(url);
    }

    getAllImageTags(): Observable<Tag[]> {
		return this.http.get<Tag[]>(this.tagUrl);
    }
    
    // getTagsByImage(id:string): Observable<ImageTag[]> {
    //     const url = `${this.imageTagUrl}/?image=${id}`;
	// 	return this.http.get<ImageTag[]>(url);
	// }
    
    // getImagesByTag(id:string): Observable<ImageTag[]> {
    //     const url = `${this.imageTagUrl}/?tag=${id}`;
	// 	return this.http.get<ImageTag[]>(url);
    // }
    
    // deleteImageTag(id:string):Observable<{}>{
    //     const url = `${this.imageTagUrl}/${id}`;
    //     return this.http.delete(url);
    // }
}
