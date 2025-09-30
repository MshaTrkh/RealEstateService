import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../navigate.directive";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "./category.service";
import {CategoryCardComponent} from "./category-card/category-card.component";

@Component({
	selector: 'app-category',
	standalone: true,
	imports: [
		NavigateDirective,
		ReactiveFormsModule,
		CategoryCardComponent
	],
	templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {

	categoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	categories: any[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private categoryService: CategoryService,
	) {
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.findAll();
	}

	save() {
		this.categoryService.save(this.categoryFormGroup.value);
		this.categoryFormGroup.reset();
	}

}
