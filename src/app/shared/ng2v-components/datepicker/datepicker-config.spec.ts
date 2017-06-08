import {Ng2vDatepickerConfig} from './datepicker-config';

describe('ng2v-datepicker-config', () => {
  it('should have sensible default values', () => {
    const config = new Ng2vDatepickerConfig();

    expect(config.dayTemplate).toBeUndefined();
    expect(config.displayMonths).toBe(1);
    expect(config.firstDayOfWeek).toBe(1);
    expect(config.markDisabled).toBeUndefined();
    expect(config.minDate).toBeUndefined();
    expect(config.maxDate).toBeUndefined();
    expect(config.navigation).toBe('select');
    expect(config.outsideDays).toBe('visible');
    expect(config.showWeekdays).toBe(true);
    expect(config.showWeekNumbers).toBe(false);
    expect(config.startDate).toBeUndefined();
  });
});
