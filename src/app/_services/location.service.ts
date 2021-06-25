import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

    getStates() : Array<any> {
        return [{ state: 'Punjab', cities: ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Faridkot", "Sunam", "Mansa", "Sangrur", "Tapa", "Jagraon" ]}, 
                {state: 'Haryana', cities: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "	Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Mahendergarh", "Pundri", "Kosli", "Kurukshetra", "Cheeka"]},
                {state: 'Maharashtra', cities: ['Pune','Mumbai','Nagpur']},
                {state: 'Karnatka', cities: ['Bangalore']},
                {state: 'Chandigarh', cities: ['Chandigarh']},
                {state: 'Delhi', cities: ['Delhi']},
                {state: 'USA', cities: ['USA']},
                {state: 'UP', cities: ['Noida']}];
    }

    getCities(state: string)  {
        if(state && state !== 'Any') {
            return this.getStates().find(st => st.state == state).cities.sort();
        }
    }
    getPreferencesCity(state: string) {
        let cities = ['Any'];
            if(state) {
                return cities.concat(this.getStates().find(st => st.state == state).cities.sort());
            }
            return cities;
    }
}