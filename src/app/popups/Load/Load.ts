import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
	selector: 'Load',
	templateUrl: 'Load.html',
})
export class Load_modal implements OnInit, OnDestroy {
	ngOnInit(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
	ngOnDestroy(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
}
