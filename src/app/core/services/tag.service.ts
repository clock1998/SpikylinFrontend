import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tag } from 'src/app/shared/models/tag';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseService<Tag> {
    Path = '/ImageTag';
	constructor(http: HttpClient) {
        super(http);
    }
}
