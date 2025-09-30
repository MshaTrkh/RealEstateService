import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {NgIf} from "@angular/common";

@Component({
	selector: 'app-reg',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		NgIf
	],
	templateUrl: './reg.component.html',
})
export class RegComponent {
	regForm = new FormGroup({
		fio: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		username: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		password: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private authService: AuthService,
	) {
	}

	regFormSubmit() {
		this.authService.reg(this.regForm.value);
	}

}
