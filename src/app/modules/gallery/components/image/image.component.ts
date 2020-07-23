import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Image } from 'src/app/shared/models/image';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: [ './image.component.scss' ]
})
export class ImageComponent implements OnInit {
	@Input() image: Image;
	@Output() isLightBoxShown: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() imageUrl: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	ngOnInit(): void {}
	showLightBox(image): void {
		this.imageUrl.emit(image.file);
	}
}
