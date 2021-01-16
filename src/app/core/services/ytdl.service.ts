import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YtdlFormModel } from '../../shared/models/ytdl-form-model';
import { environment } from '../../../environments/environment';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
	providedIn: 'root'
})
export class YtdlService {
	ytdlUrl: string = environment.Endpoint + '/ytdl/download';
	constructor(private http: HttpClient) {}

	getDownload(formData: YtdlFormModel): Observable<YtdlFormModel> {
		return this.http.post<YtdlFormModel>(this.ytdlUrl, formData, httpOptions);
	}
}
