import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SellerService } from '@app/_services/Seller/Seller.service';
import { Seller } from '@app/_models/ProductBrand';

@Component({ templateUrl: 'list.component.html' })
export class SellerListComponent implements OnInit {
    seller!: Seller[];
    sellers!: Seller[];
    path!: string;
    mbNr!:string;
    page!: number;
    count!: number;
    loopArray!: number[];
    currentPage!: number;
    firstRequest!: boolean;
    perPage: number;
    working!: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sellerService: SellerService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
        }
        this.firstRequest = true;
        this.perPage = 10;
        this.working = false;
    }

    ngOnInit() {
        this.route.queryParamMap
        .pipe(map(params => params.get('path') || 'None')).subscribe(result => this.path = result);

        this.route.queryParamMap
        .pipe(map(params => params.get('page') || 'None')).subscribe(result =>  {
                                                                let num = Number.parseInt(result);
                                                                this.page = isNaN(num) ? 0 : num;
                                                            });
        this.currentPage = 0;
        this.getAll(this.page);

    }

    onSubmit() {

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
        this.working = true;
        this.sellerService.getAllSellers(pageNr)
            .pipe(first())
            .subscribe(persons => {
              if(persons.code == 200)
                this.sellers = persons.data;
            });

            this.working = false;
    }

    //method to delete the user
    deleteSeller(id: string) {
        const user = this.sellers.find(x => x.SellerId === id);
        if (!user) return;

        this.sellerService.delete(id)
            .pipe(first())
            .subscribe((seller) => this.sellers = this.sellers.filter(sell => sell.SellerId != id));

            //this.router.navigate(['Sellers'], { relativeTo: this.route })
    }

}
