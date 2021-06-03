import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map } from 'rxjs/operators';

import { UserService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Caste, JobType } from '../_models/person';
import { Preferences } from '../_models/preferences';
import { LocationService } from '@app/_services/location.service';

@Component({ templateUrl: 'add-edit-prefer.component.html' })
export class AddEditPreferComponent implements OnInit {
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
    public jobTypes!: string[];
    public path!: string;
    public preference!: Preferences;
    public userId!: string;
    public dob!: string;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private locationService: LocationService) {
        console.log(Date.now());
        this.states = [];
        this.jobCities = this.cities = [];
        this.castes = Object.keys(Caste).filter(k => isNaN(Number(k)));
        this.isAddMode = true;
        this.route.queryParamMap
                    .pipe(map(params => params.get('path') || 'None'))
                    .subscribe(result => this.path = result);
        this.route.queryParamMap
        .pipe(map(params => params.get('dob') || 'None'))
        .subscribe(result => this.dob = result);            
        console.log(this.path);
    }

    ngOnInit() {
        this.states = this.locationService.getStates();
        this.userId = this.route.snapshot.params['id'];
        this.jobTypes = Object.keys(JobType).filter(k => isNaN(Number(k)));
        this.userService.getPreferences(this.userId, this.path)
                        .pipe(first())
                        .subscribe(prefer => {
                            this.isAddMode = false;
                            this.form.patchValue(prefer);
                            this.getCities('');
                            this.getJobCities('');
                            this.preference = prefer;
                        });

        this.form = this.formBuilder.group({
            userId: [this.userId],
            lowerAge: ['', Validators.required],
            upperAge: ['', Validators.required],
            qualification: [''],
            jobType: [['']],
            jobDesc: [''],
            jobCity: [['']],
            jobState: [['']],
            lowerIncome: ['300000'],
            upperIncome: [''],
            lowerHeight: ['60'],
            upperHeight: ['67'],
            cityPref: [['']],
            statePref: [['']],
            caste: [['']]
            });
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
            this.savePreferences();
        } else {
            this.updatePreferences();
        }
        this.routeToMainPage();
    }

    
    private routeToMainPage() {
        this.router.navigate(['../'], { queryParams: { path: this.path }, relativeTo: this.route});
    }

    getJobCities(state: string){
        this.jobCities = [];
        this.form.value["jobState"].forEach((ele: string) => {
            let city = this.locationService.getCities(ele);
            this.jobCities = this.jobCities.concat(city);
        });
    }

    getCities(state: string) {
        this.cities = [];
        this.form.value["statePref"].forEach((ele: string) => {
            let city = this.locationService.getCities(ele);
            this.cities = this.cities.concat(city);
        });
    }

    private savePreferences() {
        let prefer = this.form.value;
        // prefer.cityPref = prefer.cityPref.length > 0 ? prefer.cityPref : ['any'];
        // prefer.statePref = prefer.statePref || 'any';
        // prefer.jobType = prefer.jobType || 'any';
        // prefer.jobState = prefer.jobState || 'any';
        // prefer.jobCity = prefer.jobCity || 'any';
        // prefer.caste = prefer.caste || 'any';
        this.userService.savePreferences(this.userId, prefer, this.path)
        .subscribe(pr => console.log(pr));
    }

    private updatePreferences() {
        let prefer = this.getUpdatedPreference(this.form.value);
        this.userService.savePreferences(this.userId, prefer, this.path)
                        .subscribe(pref => this.preference = pref);
    }

    private getUpdatedPreference(per: Preferences): Preferences {
        let prefer: any = { };
        let k: keyof typeof per;
        for(k in per) {
            if(this.preference[k] == undefined || per[k] !== this.preference[k]) {
                console.log('called here' + per[k]);
                prefer[k] = per[k];
            }
        }
        return prefer;
    } 
}