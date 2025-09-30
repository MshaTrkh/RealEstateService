import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {ProductService} from "../product.service";

@Component({
	selector: 'app-product-add',
	standalone: true,
	imports: [
		NavigateDirective,
		NgIf,
		ReactiveFormsModule
	],
	templateUrl: './product-add.component.html',
})

export class ProductAddComponent implements OnInit {

	productFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		date: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		warranty: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
		country: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		firm: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		price: new FormControl(null, [Validators.required, Validators.min(0.01), Validators.max(1000000)]),
		description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
	})

	files: any = null;

	categoryId: any = null;
	categories: any[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private categoryService: CategoryService,
		private productService: ProductService
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

	changeFiles(event: any) {
		this.files = event.target.files;
	}

	changeCategoryId(event: any) {
		this.categoryId = event.target.value;
	}

	checkSubmit(): boolean {
		if (this.productFormGroup.invalid) return false
		if (this.files == null) return false
		if (this.categoryId == null) return false

		return true;
	}

	save() {
		this.productService.save(this.productFormGroup.value, this.categoryId, this.files)
	}

}
