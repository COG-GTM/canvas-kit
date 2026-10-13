import {Basic} from '../../modules/labs-react/command-palette/stories/examples/Basic';
import {EmptyState} from '../../modules/labs-react/command-palette/stories/examples/EmptyState';

describe('CommandPalette', () => {
  context('given the Basic example is rendered', () => {
    beforeEach(() => {
      cy.mount(<Basic />);
    });

    it('should not have any axe errors', () => {
      cy.checkA11y();
    });

    context('when the target button is clicked', () => {
      beforeEach(() => {
        cy.findByRole('button', {name: 'Search commands'}).click();
      });

      it('should open the command palette dialog', () => {
        cy.findByRole('dialog', {name: 'Command palette'}).should('be.visible');
      });

      it('should not have any axe errors', () => {
        cy.checkA11y();
      });

      it('should move focus to the search input', () => {
        cy.findByRole('combobox', {name: 'Command palette'}).should('have.focus');
      });

      it('should mark the first command as active', () => {
        cy.findByRole('option', {name: 'Go to Home'}).should('have.attr', 'aria-selected', 'true');
      });

      context('when the user types "nwexp"', () => {
        beforeEach(() => {
          cy.findByRole('combobox').type('nwexp');
        });

        it('should only show the matching command', () => {
          cy.findAllByRole('option').should('have.length', 1);
          cy.findByRole('option', {name: /New Expense Report/}).should(
            'have.attr',
            'aria-selected',
            'true'
          );
        });

        context('when the Enter key is pressed', () => {
          beforeEach(() => {
            cy.findByRole('combobox').type('{enter}');
          });

          it('should close the palette', () => {
            cy.findByRole('dialog').should('not.exist');
          });

          it('should run the command', () => {
            cy.contains('Last command: New Expense Report').should('exist');
          });

          it('should return focus to the target button', () => {
            cy.findByRole('button', {name: 'Search commands'}).should('have.focus');
          });
        });
      });

      context('when the user types a keyword ("pto")', () => {
        beforeEach(() => {
          cy.findByRole('combobox').type('pto');
        });

        it('should show the command with that keyword', () => {
          cy.findByRole('option', {name: /Request Time Off/}).should('exist');
        });
      });

      context('when the down arrow is pressed twice', () => {
        beforeEach(() => {
          cy.findByRole('combobox').type('{downarrow}{downarrow}');
        });

        it('should make the third command active', () => {
          cy.findByRole('option', {name: 'View My Profile'}).should(
            'have.attr',
            'aria-selected',
            'true'
          );
        });
      });

      context('when the Escape key is pressed', () => {
        beforeEach(() => {
          cy.findByRole('combobox').type('{esc}');
        });

        it('should close the palette', () => {
          cy.findByRole('dialog').should('not.exist');
        });
      });
    });

    context('when Ctrl+K is pressed', () => {
      beforeEach(() => {
        cy.get('body').type('{ctrl}k');
      });

      it('should open the command palette dialog', () => {
        cy.findByRole('dialog', {name: 'Command palette'}).should('be.visible');
      });
    });
  });

  context('given the EmptyState example is rendered', () => {
    beforeEach(() => {
      cy.mount(<EmptyState />);
      cy.findByRole('button', {name: 'Search documents'}).click();
      cy.findByRole('combobox', {name: 'Search documents'}).type('zzz');
    });

    it('should show the empty text', () => {
      cy.contains(`We couldn't find any documents matching "zzz"`).should('be.visible');
    });

    it('should not have any axe errors', () => {
      cy.checkA11y();
    });
  });
});
