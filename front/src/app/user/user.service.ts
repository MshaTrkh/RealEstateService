import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";

@Injectable({
	providedIn: 'root'
})

export class UserService {

	userSubject = new BehaviorSubject<any>({
		users: [],
	})

	constructor(
		private http: HttpClient,
		private router: Router,
		private global: GlobalService
	) {
	}

	getUsers() {
		return this.http.get(
			this.global.backendURL + '/users/all',
			{headers: this.global.headersToken}
		).subscribe({
			next: ((res: any) => {
				this.userSubject.next({
					...this.userSubject.value,
					users: res.data,
				});
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}

	getUser() {
		return this.http.get(
			this.global.backendURL + '/users',
			{headers: this.global.headersToken}
		);
	}

	update(user: any) {
		return this.http.put(
			this.global.backendURL + '/users',
			JSON.stringify(user),
			{headers: this.global.headersJsonToken}
		);
	}

	updateImg(files: any) {
		let formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}
		return this.http.patch(
			this.global.backendURL + '/users/img',
			formData,
			{headers: this.global.headersMultipartToken}
		);
	}

	updateCountry(country: string) {
		return this.http.patch(
			this.global.backendURL + `/users/country`,
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({country: country})
			}
		);
	}

	setRole(user: any) {
		return this.http.patch(
			this.global.backendURL + `/users/${user.id}/role`,
			"",
			{
				headers: this.global.headersToken,
				params: new HttpParams().appendAll({role: user.role})
			}
		).subscribe({
			next: ((res: any) => {
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}

	userDelete(user: any) {
		return this.http.delete(
			this.global.backendURL + `/users/${user.id}`,
			{headers: this.global.headersToken}
		).subscribe({
			next: ((res) => {
				let current = this.userSubject.value;
				let updated = current.users.filter((i: any) => i.id !== user.id);
				this.userSubject.next({
					...current,
					users: updated
				});
			}),
			error: ((error) => {
				console.log("error", error);
				this.router.navigate(
					['/error'],
					{
						queryParams: {
							message: error.error.code + ' : ' + error.error.message,
						},
					}
				)
			})
		});
	}

}
