import { Injectable } from "@angular/core";
import { Person } from "@app/_models";

@Injectable()
export class Globals {
    allGrooms!: Person[];
    totalGrooms!: number;
    allBrides!: Person[];
    totalBrides!:number;
}