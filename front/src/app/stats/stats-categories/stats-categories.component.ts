import { Component, OnInit } from '@angular/core';
import { StatsService } from "../stats.service";
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-stats-categories',
	standalone: true,
	imports: [
		CurrencyPipe,
		DecimalPipe
	],
	templateUrl: './stats-categories.component.html',
})
export class StatsCategoriesComponent implements OnInit {
	names: string[] = [];
	values: number[] = [];
	total: number = 0;

	constructor(private stats: StatsService) {}

	ngOnInit(): void {
		this.stats.categories().subscribe({
			next: (res: any) => {
				console.log('Данные с сервера:', res); // Логирование данных
				this.names = res.data?.names || [];
				this.values = res.data?.values || [];
				this.total = this.values.reduce((a, b) => a + b, 0);

				// Валидация данных
				if (this.names.length !== this.values.length) {
					console.error('Несоответствие данных: names и values имеют разную длину');
				}
			},
			error: (e: any) => console.error('Ошибка:', e),
		})
	}
}
