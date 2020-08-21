import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../shared/models/post';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/shared/models/user';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
  providedIn: 'root'
})
export class BlogService {
	blogPostUrl: string = environment.apiEndpoint + '/blog/post';
	constructor(private http: HttpClient) { }

	getPosts(): Observable<any> {
		return this.http.get<Post[]>(this.blogPostUrl);
	}

	getPost(id: number): Observable<Post> {
		const url = `${this.blogPostUrl}/${id}`;
		return this.http.get<Post>(url);
	}

	createPost(formData): Observable<Post> {
		return this.http.post<any>(this.blogPostUrl+"/", formData);
	}

	deletePost(id:number): Observable<{}> {
        const url = `${this.blogPostUrl}/${id}`;
		return this.http.delete(url);
	}

	updatePost(formData, id:number): Observable<Post> {
        const url = `${this.blogPostUrl}/${id}/`;
		return this.http.put<any>(url, formData);
    }
    
}
