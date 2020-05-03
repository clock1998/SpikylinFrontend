import { Component, OnInit } from '@angular/core';
import { YtdlFormModel } from '../../../../shared/models/ytdl-form-model';
import { YtdlService } from '../../../../core/services/ytdl.service';

@Component({
	selector: 'app-ybdl',
	templateUrl: './ybdl.component.html',
	styleUrls: [ './ybdl.component.scss' ]
})
export class YbdlComponent implements OnInit {
	videoFormats = [ '', 'mp4', 'm4a', 'wav', 'webm' ];
	audioFormats = [ 'mp3', 'aac', 'flac', 'm4a', 'vorbis' ];
	quality = [ [ 'High', '0' ], [ 'Medium', '5' ], [ 'Low', '9' ] ];

	formDataModel = new YtdlFormModel('', 'video', 'mp3', '0');
	returnedJson: YtdlFormModel;
	constructor(private ytdlService: YtdlService) {}

	ngOnInit(): void {}

	onSubmit() {
		this.ytdlService.getDownload(this.formDataModel).subscribe((data: YtdlFormModel) => {
			this.returnedJson = {
				url: data['url'],
				filetype: data['filetype'],
				format: data['format'],
				quality: data['quality']
			};
			console.log(JSON.stringify(this.returnedJson));
			this.downloadFile(this.returnedJson.url);
		});

		// this.downloadFile();
	}

	get diagnostic() {
		return JSON.stringify(this.formDataModel);
	}

	downloadFile(url: string, filename: string = null): void {
		this.ytdlService.downloadFile(url).subscribe((data) => {
			let dataType = data.type;
			let binaryData = [];
			binaryData.push(data);
			let downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
			downloadLink.setAttribute('download', '');
			if (filename) downloadLink.setAttribute('download', filename);
			// document.body.appendChild(downloadLink);
			downloadLink.click();
		});
	}
}
