import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {GlobalService} from "../global.service";
import {NgIf} from "@angular/common";
import {NavigateDirective} from "../navigate.directive";

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [
		NgIf,
		NavigateDirective
	],
	templateUrl: './main.component.html',
})

export class MainComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private global: GlobalService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.authService.getUser();
	}
}
