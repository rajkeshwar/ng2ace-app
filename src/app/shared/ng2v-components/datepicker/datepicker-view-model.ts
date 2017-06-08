import {Ng2vDate} from './ng2v-date';

export type DayViewModel = {
  date: Ng2vDate,
  disabled: boolean
}

export type WeekViewModel = {
  number: number,
  days: DayViewModel[]
}

export type MonthViewModel = {
  firstDate: Ng2vDate,
  number: number,
  year: number,
  weeks: WeekViewModel[],
  weekdays: number[]
} 

export enum NavigationEvent {
  PREV,
  NEXT
}
