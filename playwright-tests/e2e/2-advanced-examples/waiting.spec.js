import { test, expect } from '@playwright/test';
/// <reference types="cypress" />
context('Waiting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/waiting')
  })
  // BE CAREFUL of adding unnecessary wait times.
  // https://on.cypress.io/best-practices#Unnecessary-Waiting

  // https://on.cypress.io/wait
  test('cy.wait() - wait for a specific amount of time', async ({ page }) => {
    const waitInput1 = await page.locator('.wait-input1').type('Wait 1000ms after typing')
    cy.wait(1000)
    const waitInput2 = await page.locator('.wait-input2').type('Wait 1000ms after typing')
    cy.wait(1000)
    const waitInput3 = await page.locator('.wait-input3').type('Wait 1000ms after typing')
    cy.wait(1000)
  })

  test('cy.wait() - wait for a specific route', async ({ page }) => {
    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    const networkBtn = await page.locator('.network-btn').click()

    // wait for GET comments/1
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200, 304])
  })
})
