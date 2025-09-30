import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";
import {NavigateDirective} from "../navigate.directive";
import {StatsCategoriesComponent} from "./stats-categories/stats-categories.component";
import {StatsOrderingStatusesComponent} from "./stats-ordering-statuses/stats-ordering-statuses.component";
import {StatsTop5ProductsComponent} from "./stats-top5-products/stats-top5-products.component";
import {StatsCountriesComponent} from "./stats-countries/stats-countries.component";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

@Component({
	selector: 'app-stats',
	standalone: true,
	imports: [
		NgApexchartsModule,
		NgIf,
		NgClass,
		FormsModule,
		NavigateDirective,
		StatsCategoriesComponent,
		StatsOrderingStatusesComponent,
		StatsTop5ProductsComponent,
		StatsCountriesComponent
	],
	templateUrl: './stats.component.html',
})

export class StatsComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);
		})
	}

	generatePDF() {
		let data: any = document.getElementById('generatePDF');
		html2canvas(data).then(canvas => {
			const content = canvas.toDataURL('image/png');

			let jsPdf;
			if (canvas.width > canvas.height) {
				jsPdf = new jsPDF('p', 'cm', 'a4');
				jsPdf.addImage(content, 'PNG', 0, 0, 21, 0);
			} else {
				jsPdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
				jsPdf.addImage(content, 'PNG', 0, 0, canvas.width, canvas.height);
			}

			jsPdf.save('pdf.pdf');
		});
	}
}
