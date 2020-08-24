import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/shared/models/image';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: [ './image.component.scss' ]
})
export class ImageComponent implements OnInit, OnChanges {
    @Input() image: Image;
    @Input() editMode: boolean;
	@Output() isLightBoxShown: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() imageUrl: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}


	ngOnInit(): void {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.editMode);
    }

	showLightBox(image): void {
		this.imageUrl.emit(image.file);
	}
}
