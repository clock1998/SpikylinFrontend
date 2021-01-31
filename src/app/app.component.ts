import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './core/animation/route-amimation';
declare let gtag: Function;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	animations: [ slideInAnimation ]
})
export class AppComponent {
    title = 'SpikylinFrontend';
    constructor(public router: Router){   
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'G-NVVJVVCN8V',
                    {
                        'page_path': event.urlAfterRedirects
                    }
                );
            }
        }
        )
    }
}
