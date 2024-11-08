// Component tests for the Quiz component
import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json';

describe('Quiz Component', () => {
    context('Component renders correctly', () => {
        beforeEach(() => {
            cy.intercept('GET', '/api/questions/random', (req) => {
                req.reply(questions);
            });
            mount(<Quiz />);
        }
        );
        it('should render the quiz page', () => {
            cy.contains('Start Quiz').should('be.visible');
        });
        it ('should render the first question when the start button is clicked', () => {
            cy.get('.btn').contains('Start Quiz').click();
            cy.contains('Question 1').should('be.visible');
        });
        it ('should display the next question when an answer is selected', () => {
            cy.get('.btn').contains('Start Quiz').click();
            cy.get('input[type="radio"]').first().check();
            cy.get('.btn').contains('Next').click();
            cy.contains('Question 2').should('be.visible');
        });
        it ('should show the results at the end of the quiz', () => {
            cy.get('.btn').contains('Start Quiz').click();
            cy.get('input[type="radio"]').each(($el, index) => {
                cy.wrap($el).check();
                cy.get('.btn').contains('Next').click();
            });
            cy.contains('Your Score').should('be.visible');
        });
    }
    );
});