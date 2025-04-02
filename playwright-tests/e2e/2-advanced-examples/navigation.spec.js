import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io')
    const navbarNav = await page.locator('.navbar-nav').contains('Commands').click()
    const dropdownMenu = await page.locator('.dropdown-menu').contains('Navigation').click()
  })

  test('cy.go() - go back or forward in the browser\'s history', async ({ page }) => {
    // https://on.cypress.io/go

    cy.location('pathname').should('include', 'navigation')

    cy.go('back')
    cy.location('pathname').should('not.include', 'navigation')

    cy.go('forward')
    cy.location('pathname').should('include', 'navigation')

    // clicking back
    cy.go(-1)
    cy.location('pathname').should('not.include', 'navigation')

    // clicking forward
    cy.go(1)
    cy.location('pathname').should('include', 'navigation')
  })

  test('cy.reload() - reload the page', async ({ page }) => {
    // https://on.cypress.io/reload
    cy.reload()

    // reload the page without using the cache
    cy.reload(true)
  })

  test('cy.visit() - visit a remote url', async ({ page }) => {
    // https://on.cypress.io/visit

    // Visit any sub-domain of your current domain
    // Pass options to the visit
    cy.visit('https://example.cypress.io/commands/navigation', {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad (contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
      onLoad (contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true
      },
    })
  })
})
