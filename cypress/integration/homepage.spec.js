/// <references type="cypress" />

describe('Carga la pagina principal', () => {
    it('Prueba el Header de la Pagina Principal', () => {
        cy.visit('/');

        cy.get('[data-cy="heading-sitio"]').should('exist'); 

        cy.get('[data-cy="heading-sitio"]').invoke('text').should('equal', 'Venta de Casas y Departamentos Exclusivos de Lujo');

        cy.get('[data-cy="heading-sitio"]').invoke('text').should('not.equal', 'Bienes Raices'); 

    });

    it('Prueba el Bloque de iconos principales', () => {
        cy.visit('/');
        //selecciona el h2
        cy.get('[data-cy="iconos-nosotros"]'). should('exist');
        cy.get('[data-cy="iconos-nosotros"]').find('have.prop', 'nameTag').should('equal', 'H2');
        //Selecciona los iconos
        cy.get('[data-cy="iconos-nosotros"]'). should('exist');
        cy.get('[data-cy="iconos-nosotros"]').find('.iconos').should('have.lenght', 3);
        cy.get('[data-cy="iconos-nosotros"]').find('.iconos').should('not.have.lenght', 4);

    });

    it()
});