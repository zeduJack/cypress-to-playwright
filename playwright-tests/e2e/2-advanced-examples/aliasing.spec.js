import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Aliasing', () => {
  test.beforeEach(async (page) => {
    await page.goto('https://example.cypress.io/commands/aliasing')
  })

  test('.as() - alias a DOM element for later use', () => {
    // https://on.cypress.io/as

    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @

    const asTable = await page.locator('.as-table').find('tbody>tr')
      .first().find('td').first()
      .find('button').as('firstBtn')

    // when we reference the alias, we place an
    // @ in front of its name
    const firstbtn = await page.locator('@firstBtn').click()

    const firstbtn = await page.locator('@firstBtn')
      .should('have.class', 'btn-success')
      .and('contain', 'Changed')
  })

  test('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    const networkBtn = await page.locator('.network-btn').click()

    // https://on.cypress.io/wait
    cy.wait('@getComment').its('response.statusCode').should('eq', 200)
  })
})
