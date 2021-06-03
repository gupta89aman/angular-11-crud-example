import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    getStates() : Array<any> {
        return [{ state: 'Punjab', cities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot", "Sunam" ]}, 
                {state: 'Haryana', cities: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "	Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Mahendergarh", "Pundri", "Kosli"]},
                {state: 'Maharashtra', cities: ['Pune','Mumbai','Nagpur']},
                {state: 'Karnatka', cities: ['Bangalore']},
                {state: 'Chandigarh', cities: ['Chandigarh']},
                {state: 'Delhi', cities: ['Delhi']}];
    }

    getCities(state: string)  {
        if(state) {
            return this.getStates().find(st => st.state == state).cities.sort();
        }
    }
}