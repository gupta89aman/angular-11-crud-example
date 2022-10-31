import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ProductAddEditComponent } from './products/add-edit.component';
import { ListComponent } from './Seller/list.component';

//const SellersMo = () => import('./grooms/grooms.module').then(x => x.GroomsModule);

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'Sellers', component: ListComponent },
    { path: 'Products', component: ProductAddEditComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'Sellers' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
