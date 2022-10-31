import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { ProductsModule } from './products/products.module';
import { SellerssModule } from './Seller/sellers.module';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ProductsModule,
        SellerssModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [

        // provider used to create fake backend
        //fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
