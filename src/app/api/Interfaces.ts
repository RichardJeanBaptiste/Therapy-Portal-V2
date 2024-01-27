export interface QueryResult {
    Username: String;
    Password: String;
    Role: String;
    DatesReserved: any[];
    Therapists: any[];
    History: any[];
    Messages: any[];
    Info: any[];
    __v: number;
}

export interface Therapist {
    id: string;
    Username: string;
    Role: string;
    DatesAvailable: Array<string>;
    DatesScheduled: Array<string>;
    Clients: Array<string>;
    Info: string;
}

export interface Client {
    _id: string;
    Username: string;
    Role: string;
    DatesReserved: Array<string>;
    Therapists: Array<string>;
    Info: string;
}