import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/_models';
import { UserService } from '@app/_services';
import { map } from 'rxjs/operators';

@Component({ templateUrl : 'matches.component.html'})
export class MatchesComponent implements OnInit {
    persons!: Person[];
    path!: string;
    mbNr!:string;
    person!: Person;
    page!: number;
    count!: number;
    loopArray!: number[];
    firstRequest!: boolean;
    currentPage!: number;
    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
        }
    }

    ngOnInit() {
        //reading path parameter from query string
        this.route.queryParamMap
            .pipe(map(params => params.get('path') || 'None'))
            .subscribe(result => this.path = result);
        this.mbNr = this.route.snapshot.params['mbNr'];
        this.firstRequest = true;
        this.currentPage = 0;
        this.getMatches(this.path, this.mbNr);
    }

    //type: groom or bride
    getMatches(type: any, mbNr: string, pageNr: number = 0) {
        console.log('pageNr:' + pageNr);
        if(this.firstRequest !== true && pageNr == this.currentPage) {
            return;
        }
        this.firstRequest = false;
        this.currentPage = pageNr;
        try {
            this.userService.getMatches(mbNr, type, pageNr)
            .subscribe(matches => {
                this.persons = matches.users;
                this.count = matches.count;
                this.page =  Math.ceil(matches.total / 10);
                this.loopArray = new Array(this.page);
        });
    }catch(error){
        console.log(error);
        this.persons = Array();
    }
    }

    removeMatch(userId : string) {

    }
}