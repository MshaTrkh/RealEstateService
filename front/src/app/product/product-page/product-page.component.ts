import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalService} from "../../global.service";
import {ProductService} from "../product.service";
import {NavigateDirective} from "../../navigate.directive";
import {NgIf} from "@angular/common";
import {OrderingService} from "../../ordering/ordering.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertService} from "../../alert/alert.service";

@Component({
	selector: 'app-product-page',
	standalone: true,
	imports: [
		NavigateDirective,
		NgIf,
		ReactiveFormsModule
	],
	templateUrl: './product-page.component.html',
})

export class ProductPageComponent implements OnInit {

	product: any = {
		name: '',
	};

	orderingFormGroup = new FormGroup({
		quantity: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
		contact: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
		address: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private authService: AuthService,
		private router: Router,
		private global: GlobalService,
		private productService: ProductService,
		private activatedRoute: ActivatedRoute,
		private orderingService: OrderingService,
		private alert: AlertService,
	) {
	}

	get role() {
		return this.global.role;
	}

	ngOnInit(): void {
		this.authService.getUser().add(() => {
			if (this.role !== 'MANAGER' && this.role !== 'USER') this.router.navigate(['/login']);
		})

		this.activatedRoute.queryParams.subscribe(value => {
			this.productService.find(value['id']).subscribe({
				next: (res: any) => {
					this.product = res.data;
				},
				error: (e: any) => {
					console.log(e.error)
					this.router.navigate(['/error'], {queryParams: {message: e.error.message}});
				}
			})
		})
	}

	delete() {
		this.productService.delete(this.product.id);
	}

	ordering() {
		this.orderingService.save(this.orderingFormGroup.value, this.product.id).subscribe({
			next: () => {
				this.orderingFormGroup.reset();
				this.alert.showAlertMessage('Заявка оформлена')
			},
			error: (e: any) => {
				console.log(e.error)
				this.alert.showAlertMessage(e.error.message);
			}
		})
	}


}
