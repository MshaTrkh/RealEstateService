import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoryService} from "../category.service";

@Component({
	selector: 'app-category-card',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './category-card.component.html',
})

export class CategoryCardComponent implements OnInit {

	@Input() category: any;

	categoryFormGroup = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
	})

	constructor(
		private categoryService: CategoryService,
	) {
	}

	ngOnInit(): void {
		this.categoryFormGroup.setValue({
			name: this.category.name,
		})
	}

	update() {
		this.categoryService.update(this.category.id, this.categoryFormGroup.value);
	}

	delete() {
		this.categoryService.delete(this.category.id);
	}
}
