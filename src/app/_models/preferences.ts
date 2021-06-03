import { JobType , Caste} from './person';

export interface Preferences {
    lowerAge: number,
    upperAge: number,
    qualification: Array<string>,
    jobType: JobType,
    jobDesc: string,
    jobCity: Array<string>,
    jobState: Array<string>,
    lowerIncome: number,
    upperIncome: number,
    lowerHeight: number,
    upperHeight: number,
    cityPref: Array<string>,
    statePref: Array<string>,
    caste: Array<Caste>
}