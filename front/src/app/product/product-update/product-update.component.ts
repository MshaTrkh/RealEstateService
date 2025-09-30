import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {CategoryService} from "../../category/category.service";
import {ProductService} from "../product.service";
import {NavigateDirective} from "../../navigate.directive";

@Component({
	selector: 'app-product-update',
	standalone: true,
	imports: [
		NavigateDirective,
		ReactiveFormsModule
	],
	templateUrl: './product-update.component.html',
})

export class ProductUpdateComponent implements OnInit {

	id: any;

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
		private productService: ProductService,
		private activatedRoute: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.global.role !== 'MANAGER') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(value => {
			this.id = value['id'];
			this.productService.find(value['id']).subscribe({
				next: (res: any) => {
					this.categoryId = res.data.categoryId;
					this.productFormGroup.setValue({
						name: res.data.name,
						date: res.data.date,
						warranty: res.data.warranty,
						country: res.data.country,
						firm: res.data.firm,
						price: res.data.price,
						description: res.data.description,
					})
				},
				error: (e: any) => {
					console.log(e.error)
					this.router.navigate(['/error'], {queryParams: {message: e.error.message}});
				}
			})
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
		if (this.categoryId == null) return false

		return true;
	}

	update() {
		this.productService.update(this.id, this.productFormGroup.value, this.categoryId, this.files)
	}

}
