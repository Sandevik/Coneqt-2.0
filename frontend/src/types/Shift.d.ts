import { Worker } from "./Worker";
import { Recurrence } from "./Recurrence"

export interface Shift {
    uuid: string,
    date: string,
    title?: string
    note?: string,
    desc?: string,
    workers: Worker[]
    shiftCompletionPercentage: number,
    workersNeeded: number,
    recurring: boolean,
    recurringPeriod: Recurrence,
    category?: string,
    startTime?: string,
    endTime?: string,
    objectives?: Objectives[]
}

