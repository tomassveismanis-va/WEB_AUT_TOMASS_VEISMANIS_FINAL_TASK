import DatePickerPage from '../pages/DatePickerPage';

describe('Date And Time Picker', () => {
  it('should set date to 28 February 2013, 12:00 PM', () => {
    DatePickerPage.visit();
    DatePickerPage.openDateTimeCalendar();

    DatePickerPage.selectYear(2013);
    DatePickerPage.selectMonth('February');
    DatePickerPage.selectDay(28);
    DatePickerPage.selectTime('12:00');

    DatePickerPage.getDateTimeInputValue()
      .should('have.value', 'February 28, 2013 12:00 PM');
  });
});