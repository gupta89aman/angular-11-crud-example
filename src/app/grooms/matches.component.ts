import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/_models';
import { AlertService, UserService } from '@app/_services';
import { KundliService } from '@app/_services/kundli.service';
import { WhatsAppService } from '@app/_services/whatsapp.service';
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
    userId!: string;
    currentUser!:Person;
    usrMbNr!: string;
    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private kundliService: KundliService,
        private whatsAppService: WhatsAppService,
        private alertService: AlertService) {
            this.router.routeReuseStrategy.shouldReuseRoute = function() {
                return false;
        }
    }

    ngOnInit() {
        //reading path parameter from query string
        this.route.queryParamMap
            .pipe(map(params => params.get('path') || 'None'))
            .subscribe(result => this.path = result);
        this.route.queryParamMap
        .pipe(map(params => params.get('userId') || 'None'))
        .subscribe(result => this.userId = result);

        this.mbNr = this.route.snapshot.params['mbNr'];
        this.firstRequest = true;
        this.currentPage = 0;
        this.getMatches(this.path, this.mbNr);
        this.userService.getById(this.userId, this.path)
                                        .subscribe(data => {
                                            this.currentUser = data;
                                            console.log(this.currentUser);
                                        });
        
    }

    //type: groom or bride
    getMatches(type: any, mbNr: string, pageNr: number = 0) {
        console.log('pageNr:' + pageNr);

        //logic to stop hitting api when user clicks on the current page
        if(this.firstRequest !== true && pageNr == this.currentPage) {
            return;
        }
        this.firstRequest = false;
        this.currentPage = pageNr;
        try {
            this.userService.getMatches(mbNr, type, pageNr)
            .subscribe(matches => {
                console.log(matches.users);
                this.persons = matches.users;
                this.count = matches.count;
                this.page =  Math.ceil(matches.total / 10);
                this.loopArray = new Array(this.page);
            });
        }
        catch(error) {
            console.log(error);
            this.persons = Array();
        }
    }

    removeMatch(personId : string) {
        if(!personId || !this.userId) {
            console.log('personId:' + personId);
            console.log('userId:' + this.userId);
            return;
        }
        this.userService.deleteMatch(this.userId, personId, this.path)
        .subscribe(res => {
            this.firstRequest = true;
            this.getMatches(this.path, this.mbNr, 0);
        });

       
    }

    generateKundli() {
        if(!this.userId)
        {
            return;
        }

        this.kundliService.generateKundli(this.path, this.userId)
        .subscribe();
    }

    sendMessage(){
        console.log(this.usrMbNr);
        if(!this.usrMbNr || !this.currentUser.paid){
            this.alertService.info('You are not a paid customer. Paid: - ' + this.currentUser.paid)
            return;
        }   

        let message = '';
        for(let j = 0; j< this.persons.length; j++){
            message += ' Dob: ' + this.persons[j].dob;
            message += '\n Time: ' + this.persons[j].time;
            message += '\n Place:' + this.persons[j].cityOfBirth + '/' + this.persons[j].stateOfBirth;
            message += '\n Occupation:' + this.persons[j].jobType;
            message += '\n Kundli Score:' + this.persons[j].score;
            message += '\n Mobile Nr:' + this.persons[j].waNr;
            message += '\n ===================\n';
        }
        this.mbNr = this.usrMbNr || this.mbNr;
        this.sendWhatsAppMessage(this.mbNr, message);
    }

    sendMatch(userId: string) {
        if(!this.usrMbNr || !this.currentUser.paid){
            this.alertService.info('You are not a paid customer. Paid: - ' + this.currentUser.paid)
            return;
        }   
        let user = this.persons.find(prsn => prsn.userId === userId);
        console.log(user);
        if(user) {
            let message = ' Dob: ' + user.dob;
            message += '\n Time: ' + user.time;
            message += '\n Place:' + user.cityOfBirth + '/' + user.stateOfBirth;
            message += '\n Home Town:' + user.nativePlace;
            if(user.qualification && user.qualification !== 'BB') {
                message += '\n Qualification:' + user.qualification;
            }
            message += '\n Occupation:' + user.jobType;
            if(user.jobState) {
                message += '\n Job Location:' + user.jobCity + '/' + user.jobState 
            }
            if(user.income) {
                message += '\n Package: ' + user.income;
            }
            message += '\n Kundli Score:' + user.score;
            message += '\n Mobile Nr:' + user.waNr;
            this.mbNr = this.usrMbNr || this.mbNr;
            this.sendWhatsAppMessage(this.mbNr, message);
        }
    }

    
    private sendWhatsAppMessage(mbNr: string, message: string ){
            console.log(message);
            this.whatsAppService.sendMessage('9560170800', message)
            .subscribe();
    }
}