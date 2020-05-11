import { Component, OnInit } from '@angular/core';
import { YtdlFormModel, FileDataModel } from '../../../../shared/models/ytdl-form-model';
import { YtdlService } from '../../../../core/services/ytdl.service';
import { FiledownloadService } from '../../../../core/services/filedownload.service';

@Component({
	selector: 'app-ybdl',
	templateUrl: './ybdl.component.html',
	styleUrls: [ './ybdl.component.scss' ]
})
export class YbdlComponent implements OnInit {
	videoFormats = [ '', 'mp4', 'm4a', 'wav', 'webm' ];
	audioFormats = [ 'mp3', 'aac', 'flac', 'm4a', 'vorbis' ];
	quality = [ [ 'High', '0' ], [ 'Medium', '5' ], [ 'Low', '9' ] ];
	showProgressBar = false;
	formDataModel = new YtdlFormModel('', 'video', 'mp3', '0');
	fileData: FileDataModel;
	constructor(private ytdlService: YtdlService, private fileDownloadService: FiledownloadService) {}

	ngOnInit(): void {}

	onSubmit() {
		this.showProgressBar = true;
		if (this.formDataModel.filetype == 'video') {
			this.formDataModel.format = '';
			this.formDataModel.quality = '';
		}
		this.ytdlService.getDownload(this.formDataModel).subscribe((data: YtdlFormModel) => {
			this.fileData = {
				url: data['url'],
				fileName: data['fileName']
			};
			this.showProgressBar = false;
			// console.log(JSON.stringify(this.fileData));
			this.downloadFile(this.fileData.url, this.fileData.fileName);
			this.finishDownload(this.fileData.fileName);
		});
	}

	downloadFile(url: string, filename: string = null): void {
		this.fileDownloadService.getDownloadData(url).subscribe((data) => {
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

	finishDownload(filename: string) {
		this.fileDownloadService.removeDownloadData(filename).subscribe();
	}
}
