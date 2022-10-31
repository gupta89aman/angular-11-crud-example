import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductBrand } from '@app/_models/ProductBrand';
import { ProductsService } from '@app/_services/products/products.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    products!: ProductBrand[];
    page!: number;
    count!: number;
    loopArray!: number[];
    currentPage!: number;
    firstRequest!: boolean;
    perPage: number;
    showContactedOnly!: boolean;
    showContactedText!: string;
    prodName!:string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductsService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
        }
        this.firstRequest = true;
        this.perPage = 10;
    }

    ngOnInit() {

        this.route.queryParamMap
        .pipe(map(params => params.get('page') || 'None')).subscribe(result =>  {
                                                                let num = Number.parseInt(result);
                                                                this.page = isNaN(num) ? 0 : num;
                                                            });
        this.currentPage = 0;
        this.getAll(this.page);

    }

    //get all the users based on page number
    getAll(pageNr: number = 0) {
        // no need to call api if we click on the current page
        //but we have disabled the button of current page
        //still maintaining this code.
        if(this.firstRequest !== true && this.currentPage == pageNr) {
            return;
        }

        this.firstRequest = false;
        this.currentPage = pageNr;
        // this.productService.getAllProductsByBrandName(type, pageNr)
        //     .pipe(first())
        //     .subscribe(persons => {
        //         this.updateList(persons);
        //     });
    }

    //method to search particular person based on mobile number
    onSubmit() {

    }

    deleteProduct(pbId: string) {

    }

}
