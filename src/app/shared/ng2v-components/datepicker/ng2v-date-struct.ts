/**
 * Interface of the model of the Ng2vDatepicker and Ng2vInputDatepicker directives
 */
export interface Ng2vDateStruct {
  /**
   * The year, for example 2016
   */
  year: number;

  /**
   * The month, with default calendar we use ISO 8601: 1=Jan ... 12=Dec
   */
  month: number;

  /**
   * The day of month, starting at 1
   */
  day: number;
}
