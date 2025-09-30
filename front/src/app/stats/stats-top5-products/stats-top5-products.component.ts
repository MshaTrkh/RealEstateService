import {Component, OnInit} from '@angular/core';
import {StatsService} from "../stats.service";
import {NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-stats-top5-products',
  standalone: true,
	imports: [
		NgApexchartsModule
	],
  templateUrl: './stats-top5-products.component.html',
})

export class StatsTop5ProductsComponent implements OnInit{

	chartOptions: any;
	names: any[] = [];
	values: any[] = [];

	constructor(
		private stats: StatsService,
	) {
	}

	ngOnInit(): void {
		this.stats.top5Products().subscribe({
			next: (res: any) => {
				this.names = res.data.names;
				this.values = res.data.values;
				this.draw();
			},
			error: (e: any) => console.log(e.error),
		})
	}

	draw() {
		this.chartOptions = {
			series: [
				{
					name: "Прибыль",
					data: this.values
				}
			],
			chart: {
				height: 390,
				type: "bar",
			},
			colors: [
				"#005393",
				"#009e68",
				"#9b6700",
				"#8c0015",
				"#240097",
				"#00567f",
				"#00766a",
				"#7a0089"
			],
			plotOptions: {
				bar: {
					columnWidth: "45%",
					distributed: true
				}
			},
			dataLabels: {
				enabled: false
			},
			legend: {
				show: false
			},
			grid: {
				show: false
			},
			xaxis: {
				categories: this.names,
				labels: {
					style: {
						colors: [
							"#005393",
							"#009e68",
							"#9b6700",
							"#8c0015",
							"#240097",
							"#00567f",
							"#00766a",
							"#7a0089"
						],
						fontSize: "12px"
					}
				}
			}
		};
	}

}
