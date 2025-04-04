import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Location', () => {
  test.beforeEach(async (page) => {
    await page.goto('https://example.cypress.io/commands/location')
  })

  test('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty')
  })

  test('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty
      expect(location.href).to.eq('https://example.cypress.io/commands/location')
      expect(location.host).to.eq('example.cypress.io')
      expect(location.hostname).to.eq('example.cypress.io')
      expect(location.origin).to.eq('https://example.cypress.io')
      expect(location.pathname).to.eq('/commands/location')
      expect(location.port).to.eq('')
      expect(location.protocol).to.eq('https:')
      expect(location.search).to.be.empty
    })
  })

  test('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should('eq', 'https://example.cypress.io/commands/location')
  })
})
