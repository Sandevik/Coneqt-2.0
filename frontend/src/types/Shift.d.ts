import { Worker } from "./Worker";
import { Recurrence } from "./Recurrence"

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

