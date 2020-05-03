import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { YtdlFormModel } from '../../shared/models/ytdl-form-model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable({
	providedIn: 'root'
})
export class YtdlService {
	ytdlUrl: string = 'http://127.0.0.1:8081/ytdl/download';
	constructor(private http: HttpClient) {}

	getDownload(formData: YtdlFormModel): Observable<YtdlFormModel> {
		return this.http.post<YtdlFormModel>(this.ytdlUrl, formData, httpOptions);
	}

	downloadFile(fileURL: string): Observable<any> {
		return this.http.get<Blob>(fileURL, { responseType: 'blob' as 'json' });
	}
}
