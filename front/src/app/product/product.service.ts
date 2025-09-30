import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})

export class ProductService {

	productSubject = new BehaviorSubject<any>({
		products: [],
	})

	constructor(
		private http: HttpClient,
		private global: GlobalService,
		private alert: AlertService,
		private router: Router,
	) {
	}

	private get url() {
		return this.global.backendURL + '/products';
	}

	private error(e: any) {
		console.log(e.error)
		this.alert.showAlertMessage(e.error.message);
	}

	private page(id: number) {
		this.router.navigate(['/product'], {queryParams: {id: id}});
	}

	findAll() {
		this.http.get(
			this.url,
			{headers: this.global.headersToken,},
		).subscribe({
			next: (res: any) => this.productSubject.next({
				...this.productSubject.value,
				products: res.data,
			}),
			error: (e: any) => this.error(e),
		});
	}

	find(id: number) {
		return this.http.get(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		);
	}

	save(product: any, categoryId: number, files: any) {
		this.http.post(
			this.url,
			JSON.stringify(product),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({categoryId: categoryId}),
			},
		).subscribe({
			next: (res: any) => this.updateImg(res.data.id, files),
			error: (e: any) => this.error(e),
		});
	}

	update(id: number, product: any, categoryId: number, files: any) {
		this.http.put(
			this.url + `/${id}`,
			JSON.stringify(product),
			{
				headers: this.global.headersJsonToken,
				params: new HttpParams().appendAll({categoryId: categoryId}),
			},
		).subscribe({
			next: (res: any) => {
				if (files !== null) this.updateImg(res.data.id, files)
				else this.page(res.data.id);
			},
			error: (e: any) => this.error(e),
		});
	}

	private updateImg(id: number, files: any) {
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}
		this.http.patch(
			this.url + `/${id}/img`,
			formData,
			{headers: this.global.headersMultipartToken,},
		).subscribe({
			next: (res: any) => this.page(res.data.id),
			error: (e: any) => this.error(e),
		});
	}

	delete(id: number) {
		this.http.delete(
			this.url + `/${id}`,
			{headers: this.global.headersToken,},
		).subscribe({
			next: () => this.router.navigate(['/products']),
			error: (e: any) => this.error(e),
		});
	}

}
