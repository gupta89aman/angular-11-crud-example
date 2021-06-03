import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/_models';
import { map } from 'rxjs/operators';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    persons!: Person[];
    path!: string;
    mbNr!:string;
    person!: Person;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
        }
    }

    ngOnInit() {
        this.route.queryParamMap
        .pipe(map(params => params.get('path') || 'None')).subscribe(result => this.path = result);
        this.userService.getAll(this.path)
            .pipe(first())
            .subscribe(persons => this.persons = persons);
    }

    deleteUser(id: string) {
        const user = this.persons.find(x => x.userId === id);
        if (!user) return;

        user.isDeleting = true;
        this.userService.delete(id, this.path)
            .pipe(first())
            .subscribe(() => this.persons = this.persons.filter(x => x.userId !== id));
    }

    onSubmit() {
        if(this.mbNr) {
            let index = this.persons.findIndex(persn => persn.waNr === this.mbNr)
            if(index > -1) {
                this.person = this.persons[index];
                this.persons[index] = this.persons[0];
                this.persons[0] = this.person;
            }
            else {
                console.log(this.mbNr);
                this.userService.getByMobileNumber(this.mbNr, this.path)
                .pipe(first())
                .subscribe(person => {
                    if(Object.keys(person).length > 1) {
                        this.persons.push(person);
                    }
                });
            }
        }
    }
}