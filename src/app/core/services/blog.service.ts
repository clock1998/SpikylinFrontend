import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../shared/models/post';
import { BaseService } from './base.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseService<Post> {
	Path: string = '/post';
	constructor(http: HttpClient) {
        super(http);
    }

	// getPosts(): Observable<any> {
	// 	return this._http.get<Post[]>(this.blogPostUrl);
	// }

	// getPost(id: number): Observable<Post> {
	// 	const url = `${this.blogPostUrl}/${id}`;
	// 	return this._http.get<Post>(url);
	// }

	// createPost(formData): Observable<Post> {
	// 	return this._http.post<any>(this.blogPostUrl+"/", formData);
	// }

	// deletePost(id:number): Observable<{}> {
    //     const url = `${this.blogPostUrl}/${id}`;
	// 	return this._http.delete(url);
	// }

	// updatePost(formData, id:number): Observable<Post> {
    //     const url = `${this.blogPostUrl}/${id}/`;
	// 	return this._http.put<any>(url, formData);
    // }
}
