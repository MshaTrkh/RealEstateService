import {Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegComponent} from "./auth/reg/reg.component";
import {UserComponent} from "./user/user.component";
import {ErrorComponent} from "./error/error.component";
import {StatsComponent} from "./stats/stats.component";
import {ProfileComponent} from "./profile/profile.component";
import {CategoryComponent} from "./category/category.component";
import {ProductComponent} from "./product/product.component";
import {ProductPageComponent} from "./product/product-page/product-page.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductUpdateComponent} from "./product/product-update/product-update.component";
import {OrderingComponent} from "./ordering/ordering.component";

export const routes: Routes = [
	{path: "", component: MainComponent},

	{path: "reg", component: RegComponent},
	{path: "login", component: LoginComponent},

	{path: "profile", component: ProfileComponent},

	{path: "users", component: UserComponent},

	{path: "categories", component: CategoryComponent},

	{path: "product", component: ProductPageComponent},
	{path: "products", component: ProductComponent},
	{path: "product_add", component: ProductAddComponent},
	{path: "product_update", component: ProductUpdateComponent},

	{path: "orderings", component: OrderingComponent},

	{path: "stats", component: StatsComponent},

	{path: "error", component: ErrorComponent},
	{path: "**", component: ErrorComponent},
];
