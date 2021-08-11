import { Person } from "./person";

interface PersonData {
    users: Person[],
    count: number,
    total: number
}

interface ApiResponse {
    code: number,
    data: any
}

export {
    PersonData, ApiResponse
}