import { Worker } from "./Worker";

export interface Shift {
    uuid: string,
    date: string,
    note: string,
    workers: Worker[]
    shiftCompletionPercentage: number,
    workersNeeded: number,
    recurring: boolean,
    recurringPeriod: Recurrence,
    category?: string,
}

export enum Recurrence {
    Dayly = 0,
    Weekly = 1,
    Monthly = 2,
    Yearly = 3
}