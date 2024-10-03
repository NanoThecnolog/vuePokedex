

describe('Filter Component Test', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should filter by name', () => {
    cy.get('.filtroNome input').type('Pikachu').should('have.value', 'Pikachu');
    cy.contains('.card', 'Pikachu').should('exist');
  });

  it('should filter by ID', () => {
    cy.get('.filtroNumero input').type('25').should('have.value', '25');
    cy.contains('.card', 'Pikachu').should('exist');
  });

  it('should filter by primary type', () => {
    cy.get('.filtroTipo select').first().select('Electric');
    cy.contains('.card', 'Pikachu').should('exist');
    cy.contains('.card', 'Charizard').should('not.exist');
  });

  it('should show all Pokemons when button is clicked', () => {
    cy.get('.buttonContainer button').contains('Todos os Pokemons').click();
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('should show favorites when button is clicked', () => {
    cy.get('.buttonContainer button').contains('Favoritos').click();
    cy.get('.card').should('have.length.greaterThan', 0);
  });
});
