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
    _path = '/post';
	constructor(http: HttpClient) {
        super(http);
    }
}
