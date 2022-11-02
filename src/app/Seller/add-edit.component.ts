import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { SellerService } from '@app/_services/Seller/Seller.service';
import { Seller } from '@app/_models/ProductBrand';

@Component({ templateUrl: 'add-edit.component.html' })
export class SellerAddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    page!: number;
    seller!: Seller;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private sellerService: SellerService,
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

        //const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
        this.form = this.formBuilder.group({
            SellerId: [''],
            CompanyName: [''],
            Name: ['', Validators.required],
            MbNo: ['', [Validators.required]]
        });

        if (!this.isAddMode) {
          this.sellerService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                          this.form.patchValue({...x.data});
        });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {

      console.log('form invalid:' + this.form.invalid);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createSeller();
        } else {
            this.updateSeller();
        }
    }

    private createSeller() {
        this.seller = this.form.value;
        let len = this.seller.Name.indexOf(' ') > 0 ? this.seller.Name.indexOf(' ') : this.seller.Name.length;
       this.seller.SellerId = `${this.seller.Name.substring(0, len)}-${this.seller.MbNo}`;
       console.log(this.seller);
        this.sellerService.create(this.seller)
        .subscribe((seller) => {
            console.log(seller.data.SellerId);
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

    private updateSeller() {
      let prsn = this.form.value;
        this.sellerService.update(this.id, prsn)
            .pipe(first())
            .subscribe(() => {
                this.routeToMainPage(this.page);
            })
            .add(() => this.loading = false);
    }

    private routeToMainPage(page: number) {
        this.router.navigate(['../'], { queryParams: { page: page }, relativeTo: this.route});
    }
}
