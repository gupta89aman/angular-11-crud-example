import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Person } from '@app/_models';
import { Preferences } from '@app/_models/preferences';
import { PersonData } from '@app/_models/personData';
import { Observable, ReplaySubject } from 'rxjs';
import { Globals } from './global.service';

const baseUrl = `${environment.apiUrl}`;
const groom = 'groom';
const limit : number = 10;
let users: Person[];
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private globals: Globals) { 
    }
    
    getAll(base: string, page: number = 0) {
        // if(this.canGetFromLocal(base, page)) {
        //     return this.getFromLocal<PersonData>(page, base); 
        // }
        let response = this.http.get<PersonData>(`${baseUrl}/${base}?page=${page}`);
        //this.updateUsers(base, response);
        return response;
    }

    getById(id: string, base:string) {
        return this.http.get<Person>(`${baseUrl}/${base}/${id}`);
    }

    create(params: any, base:string) {
        var personObservable = this.http.post<Person>(`${baseUrl}/${base}`, params);
        //this.updateUser(base, personObservable);
        return personObservable;
    }

    update(id: string, params: any, base: string) {
        return this.http.put(`${baseUrl}/${base}/${id}`, params);
    }

    delete(id: string, base: string) {
        return this.http.delete(`${baseUrl}/${base}/${id}`);
    }

    getByMobileNumber(mbNr:string, base:string) {
        return this.http.get<Person>(`${baseUrl}/${base}/mobile/${mbNr}`);
    }

    getPreferences(userId: string, base: string) {
        return this.http.get<Preferences>(`${baseUrl}/${base}/preferences/${userId}`);
    }

    savePreferences(userId: string, prefer: Preferences, base: string) {
        return this.http.post<Preferences>(`${baseUrl}/${base}/preferences/${userId}`, prefer);
    }

    updatePreferences(userId: string, prefer: Preferences, base: string) {
        return this.http.put<Preferences>(`${baseUrl}/${base}/preferences/${userId}`, prefer);
    }

    getMatches(mobileNr: string, base: string, page: number = 0) {
        return this.http.get<PersonData>(`${baseUrl}/${base}/matches/mobile/${mobileNr}?page=${page}`);
    }

    generateMatches(mobileNr: number, base: string) {
        return this.http.put(`${baseUrl}/${base}/matches/${mobileNr}/find`, null);
    }

    deleteMatch(userId: string, personId: string, base: string){
        return this.http.put(`${baseUrl}/${base}/matches/${userId}/remove/${personId}`, null);
    }

    updateSentMatch(userId: string, brideId: string, base: string) {
        return this.http.put<any>(`${baseUrl}/${base}/matches/sent/${brideId}/to/${userId}`, null);
    }

    updateContacted(mbNr: string, base: string) {
        return this.http.put(`${baseUrl}/${base}/contacted/${mbNr}`, null);
    }

    private isGroom(base: string) {
        return base === groom;
    }

    private canGetFromLocal(base: string, pageNr: number) {
        if(this.isGroom(base)) {
            if(this.globals.allGrooms && this.globals.allGrooms.length > 0) {
                let existingPages = Math.ceil(this.globals.allGrooms.length / limit);
                if(existingPages >= (pageNr + 1)) {
                    return true;
                }
            }
        }
        else {
            if(this.globals.allBrides && this.globals.allBrides.length > 0) {
                let existingPages = Math.ceil(this.globals.allBrides.length / limit);
                if(existingPages >= (pageNr + 1)) {
                    return true;
                }
            }
        }
        return false;
    }

    private getFromLocal<T>(pageNr: number, base: string) : Observable<PersonData> {
        console.log('getting from local:' + pageNr);
        let personData = new ReplaySubject<PersonData>();
        let start = (pageNr) * limit;
        let end = start + limit;
        if(this.isGroom(base)){
            if(end > this.globals.allGrooms.length) {
                end = this.globals.allGrooms.length;
                console.log('end:' + end);
            }
            let grooms = [...this.globals.allGrooms.slice(start, end)];
            personData.next({
                users: grooms,
                total: this.globals.allGrooms.length,
                count: grooms.length
            });
        }
        else {
            if(end > this.globals.allBrides.length) {
                end = this.globals.allBrides.length;
            }
            let brides = [...this.globals.allBrides.slice(start, end)];
            personData.next({
                users: brides,
                total: this.globals.allBrides.length,
                count: brides.length
            });
        }
        return personData;
    }

    private updateUsers(base: string, subscriber:  Observable<PersonData>) {
        //subscribing to the observable
        subscriber
        .subscribe(persons => {
            users = [...persons.users];
            if(this.isGroom(base)) {
                if(this.globals.allGrooms && this.globals.allGrooms.length > 0){
                    this.globals.allGrooms.push(...users);
                    this.globals.totalGrooms = persons.total;
                }
                else {
                    this.globals.allGrooms = [...users];
                    this.globals.totalGrooms = persons.total;
                }
            }
            else {
                if(this.globals.allBrides && this.globals.allBrides.length > 0){
                    this.globals.allBrides.push(...users);
                    this.globals.totalBrides = persons.total;
                }
                else {
                    this.globals.allBrides = [...users];
                    this.globals.totalBrides = persons.total;
                }
            }
        });
    }

    private updateUser(base: string, subscriber:  Observable<Person>) {
        let prsn;
        //subscribing to the observable
        subscriber
        .subscribe(person => {
            prsn = person;
            if(this.isGroom(base)) {
                if(this.globals.allGrooms && this.globals.allGrooms.length > 0){
                    this.globals.allGrooms.push(prsn);
                }
            }
            else {
                if(this.globals.allBrides && this.globals.allBrides.length > 0){
                    this.globals.allBrides.push(prsn);
                }
            }
        });
    }
}