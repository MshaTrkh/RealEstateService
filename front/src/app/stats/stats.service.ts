import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})
export class StatsService {

	constructor(
		private http: HttpClient,
		private global: GlobalService
	) {
	}

	private get url() {
		return this.global.backendURL + '/stats'
	}

	categories() {
		return this.http.get(
			this.url + '/categories',
			{headers: this.global.headersToken}
		);
	}

	orderingStatuses() {
		return this.http.get(
			this.url + '/orderingStatuses',
			{headers: this.global.headersToken}
		);
	}

	top5Products() {
		return this.http.get(
			this.url + '/top5Products',
			{headers: this.global.headersToken}
		);
	}

	countries() {
		return this.http.get(
			this.url + '/countries',
			{headers: this.global.headersToken}
		);
	}

}
