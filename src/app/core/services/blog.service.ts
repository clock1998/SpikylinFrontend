import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../../shared/models/post';
import { environment } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogPostUrl: string = environment.apiEndpoint + '/blog/posts';
	constructor(private http: HttpClient) {}

	getPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(this.blogPostUrl);
	}

	createPost(formData): Observable<Post>{
		return this.http.post<any>(this.blogPostUrl, formData);
  }
  
  viewPost(formData): Observable<Post>{
		return this.http.get<any>(this.blogPostUrl);
  }

  deletePost(formData): Observable<Post>{
		return this.http.post<any>(this.blogPostUrl, formData);
  }

  updatePost(formData): Observable<Post>{
		return this.http.put<any>(this.blogPostUrl, formData);
  }
}
