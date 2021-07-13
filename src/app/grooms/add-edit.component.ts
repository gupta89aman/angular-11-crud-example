import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Caste, Religion, MrgStatus, Source, Person, JobType } from '../_models/person';
import { LocationService } from '@app/_services/location.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;
    public states: Array<any>;
    public cities: string[];
    public jobCities!: string[];
    public castes!: string[];
    public religions!: string[];
    public mrgStatuses!: string[];
    public sources!: string[];
    public jobTypes!: string[];
    public person!: Person;
    public path!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private locationService: LocationService
    ) {
        this.states = [];
        this.jobCities = this.cities = [];
        this.route.queryParamMap
        .pipe(map(params => params.get('path') || 'None')).subscribe(result => this.path = result);
    }

    ngOnInit() {
        let income = '' ;
        if(this.path === 'groom') {
            income = '0'
        }

        this.states = this.locationService.getStates();
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.castes = Object.keys(Caste).filter(k => isNaN(Number(k)));
        this.religions = Object.keys(Religion).filter(k => isNaN(Number(k)));
        this.mrgStatuses = Object.keys(MrgStatus).filter(k => isNaN(Number(k)));
        this.sources = Object.keys(Source).filter(k => isNaN(Number(k)));
        this.jobTypes = Object.keys(JobType).filter(k => isNaN(Number(k)));
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        //const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
        this.form = this.formBuilder.group({
            dob: ['', Validators.required],
            name: [''],
            time: ['', Validators.required],
            cityOfBirth: ['', [Validators.required]],
            stateOfBirth: ['', [Validators.required, RxwebValidators.alpha()]],
            nativePlace: [''],
            qualification: ['', Validators.required],
            jobType: ['', Validators.required],
            jobDesc: [''],
            jobCity: [''],
            jobState: [''],
            income: [income],
            waNr: ['', [Validators.required, RxwebValidators.digit(), RxwebValidators.maxLength({ value:10 })]],
            altNr: [''],
            email: [''],
            caste: [''],
            manglik: ['No'],
            mrgStatus: [''],
            paid: ['No'],
            religion: [''],
            source: [''],
            sourceId: [''],
            height: ['60', Validators.required],
            address: [''],
            userId:[''],
            diet: ['veg'],
            drink: ['No'],
            smoking: ['false'],
            newsPaperDate: ['2021-04-25']
            //password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
            //confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
        });

        if (!this.isAddMode) {
            this.userService.getById(this.id, this.path)
                .pipe(first())
                .subscribe(x => { 
                                let p: Person = this.formatPerson(x); 
                                this.person = p; 
                                this.form.patchValue({...p, paid : p.paid ? 'yes' : 'no', manglik: p.manglik ? 'yes' : 'no'});
                                console.log(p.newsPaperDate);
                            });
        }
    }

    private formatPerson(per: Person): Person {
        let p: Person = per;
        //p.mrgStatus = (<any>MrgStatus)[per.mrgStatus];
        // p.jobState = p.jobState.charAt(0).toUpperCase() + p.jobState.substring(1);
        this.getBirthCities(per.stateOfBirth);
        this.getJobCities(p.jobState);
        //p.jobCity = p.jobCity.charAt(0).toUpperCase() + p.jobCity.substring(1);
        return p;
    }

    getBirthCities(state: string)  {
        if(state) {
            this.cities = this.states.find(st => st.state == state).cities;
            this.cities.sort();
        }
    }

    getJobCities(state: string)  {
        if(state) {
            this.jobCities = this.states.find(st => st.state == state).cities;
            this.jobCities.sort();
        }
    }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        
        console.log('form invalid:' + this.form.invalid);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createGroom();
        } else {
            this.updateUser();
        }
    }

    private createGroom() {
        this.person = this.form.value;
        console.log(this.form.get('manglik')?.value);
        console.log(this.person);
        this.person.manglik = this.form.get('manglik')?.value === 'yes' || this.form.get('manglik')?.value === 'true' ? true : false;
        this.person.paid = this.form.get('paid')?.value === 'yes' || this.form.get('paid')?.value === 'true' ? true : false;
        this.person.nativePlace = this.person.nativePlace || this.person.cityOfBirth as string;
        this.person.jobDesc = this.person.jobDesc || this.person.jobType.toString();
        console.log(this.person.jobType.toString());
        this.person.religion = this.person.religion || Religion.Hindu;
        this.person.mrgStatus = this.person.mrgStatus || MrgStatus.Single;
        this.person.source = this.person.source || Source.Newspaper;
        this.person.caste = this.person.caste || Caste.Aggarwal;
        if(this.path === 'groom') {
            this.person.jobState = this.person.jobState || this.person.stateOfBirth as string;
            this.person.jobCity = this.person.jobCity || this.person.cityOfBirth as string;
        }
       
        this.userService.create(this.person, this.path)
        .subscribe(() => {
            this.alertService.success(`${this.path} added`, {keepAfterRouteChange: true});
            this.routeToMainPage();
        })
        .add(() => this.loading = false);
    }

    private updateUser() {
        
        let prsn = this.getUpdatedPerson(this.form.value);
        prsn.userId = this.id;
        prsn.manglik = this.form.get('manglik')?.value === 'yes' || this.form.get('manglik')?.value === 'true' ? true : false;
        console.log(prsn);

        this.userService.update(this.id, prsn, this.path)
            .pipe(first())
            .subscribe(() => {
                this.alertService.success('User updated', { keepAfterRouteChange: true });
                this.routeToMainPage();
            })
            .add(() => this.loading = false);
        console.log(prsn);
    }

    private routeToMainPage() {
        this.router.navigate(['../'], { queryParams: { path: this.path }, relativeTo: this.route});
    }
    private getUpdatedPerson(per: Person): Person {
        let prsn: any = { };
        let k: keyof typeof per;
        for(k in per) {
            if(this.person[k] == undefined || per[k] !== this.person[k]) {
                console.log('called here' + per[k]);
                prsn[k] = per[k];
            }
        }
        return prsn;
    } 
}