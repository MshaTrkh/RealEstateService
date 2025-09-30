import {Component, OnInit} from '@angular/core';
import {NavigateDirective} from "../navigate.directive";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {GlobalService} from "../global.service";
import {ProductService} from "./product.service";
import {CurrencyPipe, NgIf} from "@angular/common";
import {CategoryService} from "../category/category.service";
import {FormsModule} from "@angular/forms";

@Component({
	selector: 'app-product',
	standalone: true,
	imports: [
		NavigateDirective,
		NgIf,
		FormsModule,
		CurrencyPipe
	],
	templateUrl: './product.component.html',
})

export class ProductComponent implements OnInit {

	products: any[] = [];

	filterName: string = '';
	filterCountry: string = '';
	filterCategoryId: number = 0;
	filterPriceMin: any = null;
	filterPriceMax: any = null;

	get productsSorted() {
		let res = this.products;

		if (this.filterName !== '') res = res.filter((i: any) => i.name.toLowerCase().includes(this.filterName.toLowerCase()));

		if (this.filterCountry !== '') res = res.filter((i: any) => i.country.toLowerCase().includes(this.filterCountry.toLowerCase()));

		if (this.filterCategoryId != 0) res = res.filter((i: any) => i.categoryId == this.filterCategoryId);

		if (this.filterPriceMin !== null) res = res.filter((i: any) => i.price >= this.filterPriceMin);
		if (this.filterPriceMax !== null) res = res.filter((i: any) => i.price <= this.filterPriceMax);

		return res;
	}

	categories: any[] = [];

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private productService: ProductService,
		private categoryService: CategoryService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.role !== 'MANAGER' && this.role !== 'USER') this.router.navigate(['/login']);
		})

		this.productService.productSubject.subscribe(value => {
			this.products = value.products;
		})
		this.productService.findAll();

		this.categoryService.categorySubject.subscribe(value => {
			this.categories = value.categories;
		})
		this.categoryService.findAll();
	}

}
