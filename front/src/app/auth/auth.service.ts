import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {AlertService} from "../alert/alert.service";

@Injectable({
	providedIn: 'root'
})

export class AuthService {

	constructor(
		private http: HttpClient,
		private router: Router,
		private global: GlobalService,
		private alert: AlertService,
	) {
	}

	login(user: any) {
		this.http.post<any>(
			this.global.backendURL + '/users/login',
			"",
			{headers: {'Authorization': 'Basic ' + btoa(user.username + ":" + user.password)}}
		).subscribe({
			next: ((res: any) => {
				this.global.set(res.data.user.id, res.data.user.role, res.data.token);
				this.router.navigate(['/']);
			}),
			error: ((error) => {
				console.log("error", error);
				if (error.status === 0) this.alert.showAlertMessage("Сервер не работает");
				else this.alert.showAlertMessage(error.error.message)
			})
		})
	}

	reg(user: any) {
		this.http.post<any>(
			this.global.backendURL + '/users',
			user,
		).subscribe({
			next: (() => {
				this.login(user);
			}),
			error: ((error) => {
				console.log("error", error);
				if (error.status === 0) this.alert.showAlertMessage("Сервер не работает");
				else this.alert.showAlertMessage(error.error.message)
			})
		})
	}

	getUser() {
		return this.http.get<any>(
			this.global.backendURL + '/users',
			{headers: this.global.headersToken}
		).subscribe({
			next: ((res) => {
				this.global.role = res.data.role;
			}),
			error: (() => {
				this.global.clear();
			})
		});
	}

	logout() {
		this.global.clear();
		this.router.navigate(['/login'])
	}
}
