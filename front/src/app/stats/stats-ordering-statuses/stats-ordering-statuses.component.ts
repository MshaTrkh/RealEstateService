import { Component, OnInit } from '@angular/core';
import { StatsService } from "../stats.service";
import { DecimalPipe } from '@angular/common';

@Component({
	selector: 'app-stats-ordering-statuses',
	standalone: true,
	imports: [
		DecimalPipe
	],
	templateUrl: './stats-ordering-statuses.component.html',
})
export class StatsOrderingStatusesComponent implements OnInit {
	names: string[] = [];
	values: number[] = [];
	total: number = 0;
	statusColors: { [key: string]: string } = {
		'Рассмотрение': '#3498db',
		'Документы переданы в обработку': '#f1c40f',
		'Подписаны юристом': '#ff7000',
		'Подписаны застройщиком': '#7def56',
		'Документы готовы': '#2ecc71',
		'Отклонено': '#e74c3c'
	};

	constructor(private stats: StatsService) {}

	ngOnInit(): void {
		this.stats.orderingStatuses().subscribe({
			next: (res: any) => {
				this.names = res.data?.names || [];
				this.values = res.data?.values || [];
				this.total = this.values.reduce((a, b) => a + b, 0);
			},
			error: (e: any) => console.error('Ошибка:', e),
		})
	}

	getStatusColor(status: string): string {
		return this.statusColors[status] || '#95a5a6';
	}
}
