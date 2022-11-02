import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SellersRoutingModule } from './sellers-routing.module';
import { LayoutComponent } from './layout.component';
import { SellerListComponent } from './list.component';
import { SellerAddEditComponent } from './add-edit.component';
//import { AddEditPreferComponent } from './add-edit-prefer.component';
import { SellerService } from '@app/_services/Seller/Seller.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SellersRoutingModule,
        FormsModule
    ],
    declarations: [
        LayoutComponent,
        SellerListComponent,
        SellerAddEditComponent,
    ],
    providers: [
        SellerService
    ],
    exports: [
      SellersRoutingModule
    ]
})
export class SellerssModule { }
