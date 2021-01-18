import {
	Component,
	OnInit,
	HostListener,
	ViewChild,
	ViewChildren,
	QueryList,
	ElementRef,
	AfterViewInit
} from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.scss' ]
})
export class AboutComponent implements OnInit {
	@ViewChild('aboutMe') aboutSection;
	@ViewChild('myMission') missionSection;

	constructor() {}

	@HostListener('window:scroll', [ '$event' ])
	onScrollEvent($event) {}
	ngAfterViewInit() {
		console.log(this.aboutSection);
	}
	ngOnInit(): void {}
}
