import { BasePage } from './BasePage';

export class DatePickerPage extends BasePage {
  static get url() {
    return "https://demoqa.com/date-picker";
  }

  static get dateAndTimeInput() {
    return cy.get('#dateAndTimePickerInput');
  }

  static get yearReadView() {
    return cy.get('.react-datepicker__year-read-view');
  }

  static get yearDropdown() {
    return cy.get('.react-datepicker__year-dropdown');
  }

  static get yearOption() {
    return cy.get('.react-datepicker__year-option');
  }

  static get monthReadView() {
    return cy.get('.react-datepicker__month-read-view');
  }

  static get monthDropdown() {
    return cy.get('.react-datepicker__month-dropdown');
  }

  static get day() {
    return cy.get('.react-datepicker__day');
  }

  static get timeListItem() {
    return cy.get('.react-datepicker__time-list-item');
  }

  static openDateTimeCalendar() {
    this.dateAndTimeInput.click();
  }

  static selectYear(year) {
    this.yearReadView.click();
    this.yearDropdown.should('be.visible');

    const trySelect = (attempts = 0) => {
      this.yearOption.then(($options) => {
        const match = [...$options].find(
          (el) => el.textContent.trim() === year.toString()
        );

        if (match) {
          cy.wrap(match).click({ force: true });
        } else if (attempts < 30) {
          cy.get('.react-datepicker__year-dropdown > :nth-child(13)').click();
          cy.wait(150);
          trySelect(attempts + 1);
        } else {
          throw new Error(`Gads ${year} netika atrasts pēc klikšķināšanas`);
        }
      });
    };

    trySelect();
  }

  static selectMonth(month) {
    this.monthReadView.click();
    this.monthDropdown
      .find('.react-datepicker__month-option')
      .contains(month)
      .click();
  }

  static selectDay(day) {
    this.day
      .not('.react-datepicker__day--outside-month')
      .contains(new RegExp(`^${day}$`))
      .click();
  }

  static selectTime(time) {
    this.timeListItem.contains(time).click();
  }

  static getDateTimeInputValue() {
    return this.dateAndTimeInput;
  }
}