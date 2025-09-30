import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {NavigateDirective} from "../navigate.directive";
import {UserService} from "../user/user.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from "../alert/alert.service";
import {EnumService} from "../enum.service";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [
		NavigateDirective,
		ReactiveFormsModule,
		NgIf,
		NgForOf,
		KeyValuePipe
	],
	templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {

	userFormGroup = new FormGroup({
		fio: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		address: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		unp: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	img: string = '';

	country: string = ''
	countries: any[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private userService: UserService,
		private alert: AlertService,
		private enumService: EnumService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.role === 'NOT') this.router.navigate(['/login']);
		})

		this.userService.getUser().subscribe({
			next: (res: any) => {
				this.country = res.data.country;
				this.img = res.data.img;
				this.userFormGroup.setValue({
					fio: res.data.fio,
					address: res.data.address,
					unp: res.data.unp,
				})
			},
			error: (e: any) => {
				console.log(e.error);
				this.alert.showAlertMessage(e.error.message);
				this.router.navigate(['/login']);
			}
		})

		this.enumService.enumSubject.subscribe(value => {
			this.countries = value.countries;
		})
		this.enumService.countries();

	}

	update() {
		this.userService.update(this.userFormGroup.value).subscribe({
			next: (res: any) => {
				this.alert.showAlertMessage('Данные успешно обновлены');
				this.userFormGroup.setValue({
					fio: res.data.fio,
					address: res.data.address,
					unp: res.data.unp,
				})
			},
			error: (e: any) => {
				console.log(e.error);
				this.alert.showAlertMessage(e.error.message);
			}
		});
	}

	updateImg(event: any) {
		this.userService.updateImg(event.target.files).subscribe({
			next: (res: any) => {
				this.img = res.data.img;
			},
			error: (e: any) => {
				console.log(e.error);
				this.alert.showAlertMessage(e.error.message);
			}
		});
	}

	updateCountry(event: any) {
		this.userService.updateCountry(event.target.value).subscribe({
			next: (res: any) => {
				this.country = res.data.country;
			},
			error: (e: any) => {
				console.log(e.error);
				this.alert.showAlertMessage(e.error.message);
			}
		});
	}


}
