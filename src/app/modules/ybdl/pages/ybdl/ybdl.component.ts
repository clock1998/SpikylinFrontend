import { Component, OnInit } from '@angular/core';
import { YtdlFormModel } from '../../../../shared/models/ytdl-form-model';
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
	constructor() {}

	ngOnInit(): void {}
	onSubmit() {}

	changeSearchQueryOption(event: any): void {
		console.log(event.target.value);
	}
	get diagnostic() {
		return JSON.stringify(this.formDataModel);
	}
}
