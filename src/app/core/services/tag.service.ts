import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
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
