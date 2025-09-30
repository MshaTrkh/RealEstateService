import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class OrderingService {

	orderingSubject = new BehaviorSubject<any>({
		orderings: [],
	});

	constructor(
		private http: HttpClient,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	private get url() {
		return this.global.backendURL + '/orderings';
	}

	private error(e: any) {
		console.log(e.error)
		this.alert.showAlertMessage(e.error.message);
	}

	findAll() {
		this.http.get(
			this.url,
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => this.orderingSubject.next({
				...this.orderingSubject.value,
				orderings: res.data,
			}),
			error: (e: any) => this.error(e),
		});
	}

	save(ordering: any, productId: number) {
		return this.http.post(
			this.url,
			JSON.stringify(ordering),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({productId: productId}),
			},
		);
	}

	confirmed(id: number) {
		this.http.get(
			this.url + `/${id}/confirmed`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.map((i: any) => id === i.id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}

	rejected(id: number) {
		this.http.get(
			this.url + `/${id}/rejected`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.map((i: any) => id === i.id ? res.data : i);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}

	collected(id: number) {
		this.http.get(
			this.url + `/${id}/collected`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => id !== i.id);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}

	packed(id: number) {
		this.http.get(
			this.url + `/${id}/packed`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => id !== i.id);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}

	delivered(id: number) {
		this.http.get(
			this.url + `/${id}/delivered`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => id !== i.id);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => {
				let orderings = this.orderingSubject.value.orderings;
				orderings = orderings.filter((i: any) => id !== i.id);
				this.orderingSubject.next({
					...this.orderingSubject.value,
					orderings: orderings,
				})
			},
			error: (e: any) => this.error(e),
		});
	}


}
