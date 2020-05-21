import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FiledownloadService {
	constructor(private http: HttpClient) {}

	getDownloadData(fileURL: string): Observable<any> {
		return this.http.get<Blob>(fileURL, { responseType: 'blob' as 'json' });
	}

	removeDownloadData(filename: string): Observable<any> {
		return this.http.delete(environment.apiEndpoint + '/ytdl/delete/' + filename);
	}
}
