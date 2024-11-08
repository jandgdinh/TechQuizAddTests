// Component tests for the Quiz component
import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
    it('renders the Quiz component', () => {
        mount(<Quiz />);
        cy.get('[data-testid="quiz"]').should('exist');
    });

    it('displays the correct question', () => {
        const question = "What is the capital of France?";
        const options = ["Paris", "London", "Berlin", "Madrid"];
        mount(<Quiz question={question} options={options} />);
        cy.get('[data-testid="question"]').should('contain', question);
    });

    it('displays the correct number of options', () => {
        const question = "What is the capital of France?";
        const options = ["Paris", "London", "Berlin", "Madrid"];
        mount(<Quiz question={question} options={options} />);
        cy.get('[data-testid="option"]').should('have.length', options.length);
    });

    it('calls the onAnswer callback when an option is clicked', () => {
        const question = "What is the capital of France?";
        const options = ["Paris", "London", "Berlin", "Madrid"];
        const onAnswer = cy.stub();
        mount(<Quiz question={question} options={options} onAnswer={onAnswer} />);
        cy.get('[data-testid="option"]').first().click();
        cy.wrap(onAnswer).should('have.been.calledOnce');
    });
});