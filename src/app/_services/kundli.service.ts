import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const baseUrl = `${environment.kundliUrl}`;

@Injectable({ providedIn: 'root'})
export class KundliService {
    constructor(private http: HttpClient) { 
    }

    generateKundli(base: string, userId: string, secUserId: string = '') {
        let url = `${baseUrl}/${base}/${userId}`;
        if(secUserId !== '') {
            url += `?secUserId=${secUserId}`;
        }
        return this.http.put<any>(url , null);
    }
    
    
}