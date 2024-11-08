// End-to-end tests for the Tech Quiz
describe('Tech Quiz', () => {
    beforeEach(() => {
        cy.visit('/'); // Adjust the URL to your application's URL
    });

    it('should load the quiz page', () => {
        cy.contains('Tech Quiz').should('be.visible');
    });

    it('should start the quiz when the start button is clicked', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.contains('Question 1').should('be.visible');
    });

    it('should display the next question when an answer is selected', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('input[type="radio"]').first().check();
        cy.get('button').contains('Next').click();
        cy.contains('Question 2').should('be.visible');
    });

    it('should show the results at the end of the quiz', () => {
        cy.get('button').contains('Start Quiz').click();
        cy.get('input[type="radio"]').each(($el, index) => {
            cy.wrap($el).check();
            cy.get('button').contains('Next').click();
        });
        cy.contains('Your Score').should('be.visible');
    });
});