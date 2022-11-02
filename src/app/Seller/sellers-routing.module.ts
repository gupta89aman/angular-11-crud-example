import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { SellerListComponent } from './list.component';
import { SellerAddEditComponent } from './add-edit.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: SellerListComponent },
            { path: 'add', component: SellerAddEditComponent },
            { path: 'edit/:id', component: SellerAddEditComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SellersRoutingModule { }
