import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class FiledownloadService {
	constructor(private http: HttpClient) {}

	getDownloadData(fileURL: string): Observable<any> {
		return this.http.get<Blob>(fileURL, { responseType: 'blob' as 'json' });
	}
}
