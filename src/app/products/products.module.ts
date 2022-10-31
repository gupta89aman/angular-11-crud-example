import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { ProductAddEditComponent } from './add-edit.component';
//import { AddEditPreferComponent } from './add-edit-prefer.component';
import { ProductsService } from '@app/_services/products/products.service';
import { SellerService } from '@app/_services/Seller/Seller.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductsRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        ProductAddEditComponent,
    ],
    providers: [
        ProductsService,
        SellerService
    ]
})
export class ProductsModule { }
