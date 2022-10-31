import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { ProductsService } from '@app/_services/products/products.service';
import { ProductBrand } from '@app/_models/ProductBrand';
import { CommonModule } from '@angular/common';
@Component({ templateUrl: 'add-edit.component.html' })
export class ProductAddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    public page!: number;
    public location!:string;
    product!: ProductBrand;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService
    ) {
        this.route.queryParamMap
        .pipe(map(params => params.get('page') || 'None')).subscribe(result => {
            let num = Number.parseInt(result);
            this.page = isNaN(num) ? 0 : num;
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        //const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
        this.form = this.formBuilder.group({
            pbId: [''],
            Brand: ['', Validators.required],
            ProductName: ['', Validators.required],
            MRP: ['', Validators.required],
            Quantity: ['', [Validators.required]],
            Unit: ['', [Validators.required]],
            UnitPrice: ['', Validators.required],
            BuyPrice: ['', Validators.required],
            SellPrice: ['', Validators.required],
            Seller: ['']
          });

        if (!this.isAddMode) {
            this.productsService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                          this.form.patchValue({...x.data});
        });
    }
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
       // this.alertService.clear();

        console.log('form invalid:' + this.form.invalid);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createProduct();
        } else {
            //this.updateUser();
        }
    }

    private createProduct() {
        this.product = this.form.value;
        this.product.pbId = `${this.product.ProductName.substring(this.product.ProductName.length-5)}-${Math.floor(Math.random() * 10000)}`.replace(' ','-');
        this.productsService.create(this.product)
        .subscribe(() => {
            //this.alertService.success(`${this.path} added`, {keepAfterRouteChange: true});
            this.routeToMainPage(0);
        })
        .add(() => this.loading = false);
    }

    private getFormValueFor(property: string): boolean {
        return this.form.get(property)?.value === 'y'
                || this.form.get(property)?.value === 'Y'
                || this.form.get(property)?.value === 'yes'
                || this.form.get(property)?.value === 'true' ? true : false;
    }

    private routeToMainPage(page: number) {
        this.router.navigate(['../'], { queryParams: { page: page }, relativeTo: this.route});
    }

    // private getUpdatedPerson(per: Person): Person {
    //     let prsn: any = { };
    //     let k: keyof typeof per;
    //     for(k in per) {
    //         if(this.person[k] == undefined || per[k] !== this.person[k]) {
    //             console.log('called here' + per[k]);
    //             prsn[k] = per[k];
    //         }
    //     }
    //     if(prsn.qualification){
    //         prsn.qualification = prsn.qualification.split(',');
    //     }

    //     if(prsn.familyDetails){
    //         let hasFamilyDetails = /\d/.test(prsn.familyDetails) || prsn.familyDetails.length > 50;
    //         console.log('has family details:'+ hasFamilyDetails);
    //         if(hasFamilyDetails) {
    //             prsn.familyDetails = prsn.familyDetails.replace('\n','');
    //         }
    //         else {
    //             delete prsn.familyDetails;
    //         }
    //     }
    //     return prsn;
    // }
}
