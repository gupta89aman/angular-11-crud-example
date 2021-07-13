import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const baseUrl = `${environment.kundliUrl}`;

@Injectable({ providedIn: 'root'})
export class KundliService {
    constructor(private http: HttpClient) { 
    }

    generateKundli(base: string, userId: string) {
        return this.http.put(`${baseUrl}/${base}/${userId}`, null);
    }
}