class DatePickerPage {
  visit() {
    cy.visit('https://demoqa.com/date-picker');
  }

  openDateTimeCalendar() {
    cy.get('#dateAndTimePickerInput').click();
  }

selectYear(year) {
  cy.get('.react-datepicker__year-read-view').click();
  cy.get('.react-datepicker__year-dropdown').should('be.visible');

  const clickDownArrow = () => {
    cy.get('.react-datepicker__year-dropdown > :nth-child(13)').click();
  };

  const trySelect = (attempts = 0) => {
    cy.get('.react-datepicker__year-option').then(($options) => {
      const match = [...$options].find(
        (el) => el.textContent.trim() === year.toString()
      );

      if (match) {
        cy.wrap(match).click({ force: true });
      } else if (attempts < 30) {
        clickDownArrow();
        cy.wait(150);
        trySelect(attempts + 1);
      } else {
        throw new Error(`Gads ${year} netika atrasts pēc klikšķināšanas`);
      }
    });
  };

  trySelect();
}

  selectMonth(month) {
    cy.get('.react-datepicker__month-read-view').click();
    cy.get('.react-datepicker__month-dropdown')
      .find('.react-datepicker__month-option')
      .contains(month)
      .click();
  }

  selectDay(day) {
    cy.get('.react-datepicker__day')
      .not('.react-datepicker__day--outside-month')
      .contains(new RegExp(`^${day}$`))
      .click();
  }

  selectTime(time) {
    cy.get('.react-datepicker__time-list-item')
      .contains(time)
      .click();
  }

  getDateTimeInputValue() {
    return cy.get('#dateAndTimePickerInput');
  }
}

export default new DatePickerPage();