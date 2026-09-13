import { DatePickerPage } from '../pages/DatePickerPage';

describe('Date And Time Picker', () => {
  context('Set date and time', () => {
    beforeEach(() => {
      DatePickerPage.visit();
    });

    it('should set date to 28 February 2013, 12:00 PM', () => {
      const targetYear = 2013;
      const targetMonth = 'February';
      const targetDay = 28;
      const targetTime = '12:00';
      const expectedValue = 'February 28, 2013 12:00 PM';

      DatePickerPage.openDateTimeCalendar();
      DatePickerPage.selectYear(targetYear);
      DatePickerPage.selectMonth(targetMonth);
      DatePickerPage.selectDay(targetDay);
      DatePickerPage.selectTime(targetTime);

      DatePickerPage.getDateTimeInputValue()
        .should('have.value', expectedValue);
    });
  });
});