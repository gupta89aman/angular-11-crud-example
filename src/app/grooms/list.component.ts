import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/_models';
import { map } from 'rxjs/operators';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    persons!: Person[];
    allPersons!: Person[];
    path!: string;
    mbNr!:string;
    person!: Person;
    page!: number;
    count!: number;
    loopArray!: number[];
    currentPage!: number;
    firstRequest!: boolean;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
        }
        this.firstRequest = true;
    }

    ngOnInit() {
        this.route.queryParamMap
        .pipe(map(params => params.get('path') || 'None')).subscribe(result => this.path = result);
        this.currentPage = 0;
        this.getAll(this.path);

    }

    //get all the users based on page number
    getAll(type : any , pageNr: number = 0) {
        // no need to call api if we click on the current page
        //but we have disabled the button of current page
        //still maintaining this code.
        if(this.firstRequest !== true && this.currentPage == pageNr) {
            return;
        }

        this.firstRequest = false;
        this.currentPage = pageNr;
        this.userService.getAll(type, pageNr)
            .pipe(first())
            .subscribe(persons => {
                this.persons = persons.users;
                this.count = persons.count;
                this.page =  Math.ceil(persons.total / 10);
                //used for paging purpose,stores page numbers to show on front html view
                this.loopArray = new Array(this.page);
            });
    }


    //method to delete the user
    deleteUser(id: string) {
        const user = this.persons.find(x => x.userId === id);
        if (!user) return;

        user.isDeleting = true;
        this.userService.delete(id, this.path)
            .pipe(first())
            .subscribe(() => this.persons = this.persons.filter(x => x.userId !== id));
    }

    generateMatches(waNr: string) {
        this.userService.generateMatches(+waNr, this.path)
        .subscribe();
    }

    //method to search particular person based on mobile number
    onSubmit() {
        if(this.mbNr) {
            let index = this.persons.findIndex(persn => persn.waNr === this.mbNr)
            if(index > -1) {
                this.person = this.persons[index];
                this.persons[index] = this.persons[0];
                this.persons[0] = this.person;
            }
            else {
                this.userService.getByMobileNumber(this.mbNr, this.path)
                .pipe(first())
                .subscribe(person => {
                    if(Object.keys(person).length > 1) {
                        this.persons[0] = person;
                    }
                });
            }
        }
    }
}