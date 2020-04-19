import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query } from '@angular/animations';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ],
	animations: [
		trigger('fade', [
			state(
				'show',
				style({
					transform: 'translateX(0%)',
					opacity: 1
				})
			),
			transition('* <=> show', [ animate('0.5s') ])
		])
	]
})
export class NavbarComponent implements OnInit {
	isNavHide = true;
	constructor() {}

	ngOnInit(): void {}
	toggleNavbar(): void {
		this.isNavHide = !this.isNavHide;
	}
}
