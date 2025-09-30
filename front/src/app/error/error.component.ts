import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [
		NgIf
	],
	templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {

	message = "";

	constructor(
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => {
			this.message = params['message'];
		})
	}

}
