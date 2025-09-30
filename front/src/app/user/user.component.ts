import {Component, OnInit} from '@angular/core';
import {UserCardComponent} from "./user-card/user-card.component";
import {UserService} from "./user.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {EnumService} from "../enum.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GlobalService} from "../global.service";
import {NavigateDirective} from "../navigate.directive";

@Component({
	selector: 'app-user',
	standalone: true,
    imports: [
        UserCardComponent,
        NgIf,
        NgForOf,
        ReactiveFormsModule,
        FormsModule,
        NavigateDirective
    ],
	templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

	users: any[] = [];

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private enumService: EnumService,
		private router: Router,
		private global: GlobalService,
	) {
	}

	ngOnInit() {
		this.authService.getUser().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login'])
		})

		this.userService.userSubject.subscribe(value => {
			this.users = value.users;
		})

		this.enumService.roles();
		this.userService.getUsers();
	}

	getSortedUsers() {
		return this.users.sort((a: any, b: any) => {
			if (a.id > b.id) return -1;
			if (a.id < b.id) return 1;
			return 0;
		});
	}

	get userid() {
		return this.global.userid;
	}
}
