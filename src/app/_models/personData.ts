import { Person } from "./person";

export interface PersonData {
    users: Person[],
    count: number,
    total: number
}