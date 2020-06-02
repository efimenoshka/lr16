export interface Mworker {
    id: number;
    surname: string;
    name: string;
    middlename: string;
    phone: string;
    email: string;
    birthday: string;
    departament: number;
}

export enum MworkerDepartament {
    it,
    sales,
    delivery,
    legal
}