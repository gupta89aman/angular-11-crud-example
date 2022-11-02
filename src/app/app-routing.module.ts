import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';

const SellersModule = () => import('./Seller/sellers.module').then(x => x.SellerssModule);
const ProductsModule = () => import('./products/products.module').then(x => x.ProductsModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Sellers', loadChildren: SellersModule },
    { path: 'Products', loadChildren: ProductsModule },

    // otherwise redirect to home
    { path: '**', redirectTo: 'Sellers' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
