import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {NavigateDirective} from "../navigate.directive";
import {OrderingService} from "./ordering.service";
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";

@Component({
	selector: 'app-ordering',
	standalone: true,
	imports: [
		NavigateDirective,
		NgIf,
		CurrencyPipe,
		NgClass
	],
	templateUrl: './ordering.component.html',
})

export class OrderingComponent implements OnInit {

	orderings: any[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private orderingService: OrderingService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.role === 'NOT') this.router.navigate(['/login']);
		})

		this.orderingService.orderingSubject.subscribe(value => {
			this.orderings = value.orderings;
		})
		this.orderingService.findAll();
	}

	confirmed(id: number) {
		this.orderingService.confirmed(id);
	}

	rejected(id: number) {
		this.orderingService.rejected(id);
	}

	collected(id: number) {
		this.orderingService.collected(id);
	}

	packed(id: number) {
		this.orderingService.packed(id);
	}

	delivered(id: number) {
		this.orderingService.delivered(id);
	}

	delete(id: number) {
		this.orderingService.delete(id);
	}
}
