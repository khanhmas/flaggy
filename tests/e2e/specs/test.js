// https://docs.cypress.io/api/introduction/api.html

describe('FlagGallery test', () => {
  it('should visit the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Where in the world ?');
  });
});
