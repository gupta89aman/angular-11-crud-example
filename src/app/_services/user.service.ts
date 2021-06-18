import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Person, User } from '@app/_models';
import { Preferences } from '@app/_models/preferences';
import { PersonData } from '@app/_models/personData';

const baseUrl = `${environment.apiUrl}`;

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(base: string, page: number = 0) {
        console.log('page' + page);
        return this.http.get<PersonData>(`${baseUrl}/${base}?page=${page}`);
    }

    getById(id: string, base:string) {
        return this.http.get<Person>(`${baseUrl}/${base}/${id}`);
    }

    create(params: any, base:string) {
        return this.http.post(`${baseUrl}/${base}`, params);
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
        return this.http.put<Preferences>(`${baseUrl}/${base}/preferences/${userId}`, prefer);
    }

    getMatches(mobileNr: string, base: string, page: number = 0) {
        return this.http.get<PersonData>(`${baseUrl}/${base}/matches/mobile/${mobileNr}?page=${page}`);
    }
}