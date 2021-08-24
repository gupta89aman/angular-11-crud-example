export interface Person {
    name: string,
    dob: string,
    time: string,
    cityOfBirth: string,
    stateOfBirth: string,
    nativePlace: string,
    qualification: string[],
    jobType: JobType,
    jobDesc: string,
    jobCity: string,
    jobState: string,
    income: number,
    waNr: string,
    altNr: string,
    email: string,
    caste: Caste,
    manglik: boolean,
    mrgStatus: MrgStatus,
    paid: boolean,
    religion: string,
    source: Source,
    sourceId: string,
    height: number,
    userId: string,
    address: string,
    isDeleting: boolean,
    diet: string,
    drink: string,
    smoking: boolean,
    newsPaperDate: string,
    score: string,
    _id: string,
    sent: boolean,
    vsent: boolean,
    pr: boolean,
    prCountry: string,
    ilets: boolean,
    iletsBand: number,
    contacted: boolean,
    contactedDate: string,
    familyDetails: string,
    hasPhoto: boolean
}

export enum JobType {
    Govt = 'Govt',
    Private = 'Private',
    Business = 'Business',
    HouseWife = 'HouseWife'
}

export enum Caste {
    Aggarwal = 'Aggarwal',
    Mittal = 'Mittal',
    Goyal = 'Goyal',
    Arora = 'Arora',
    Jain = 'Jain'
}

export enum MrgStatus {
    Single = 'Single',
    Widow = 'Widow',
    Divorcee = 'Divorcee'
}

export enum Religion {
    Hindu = 'Hindu',
    Jain = 'Jain',
    Sikh = 'Sikh'
}

export enum Source {
    Newspaper = 'Newspaper',
    Jeewansathi = 'Jeewansathi',
    Shadi = 'Shadi',
    AggarwalGroup = 'Aggarwal Group'
}