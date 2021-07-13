import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";

const baseUrl = environment.whatsAppURL;

@Injectable({ providedIn: 'root'})
export class WhatsAppService {
    constructor(private http: HttpClient){

    }

    sendMessage(mbNr: string, message: string){
        let sentMessage = { message: message}
        return this.http.post(`${baseUrl}/${mbNr}`, sentMessage);
    }
}