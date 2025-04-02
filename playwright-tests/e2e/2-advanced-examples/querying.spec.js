import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Querying', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/querying')
  })

  // The most commonly used query is 'cy.get()', you can
  // think of this like the '$' in jQuery

  test('cy.get() - query DOM elements', async ({ page }) => {
    // https://on.cypress.io/get

    const queryBtn = await page.locator('#query-btn').should('contain', 'Button')

    const queryBtn = await page.locator('.query-btn').should('contain', 'Button')

    const queryingWellButtonFirst = await page.locator('#querying .well>button:first').should('contain', 'Button')
    //              ↲
    // Use CSS selectors just like jQuery

    const dataTestIdTestExample = await page.locator('[data-test-id="test-example"]').should('have.class', 'example')

    // 'cy.get()' yields jQuery object, you can get its attribute
    // by invoking `.attr()` method
    const dataTestIdTestExample = await page.locator('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example')

    // or you can get element's CSS property
    const dataTestIdTestExample = await page.locator('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static')

    // or use assertions directly during 'cy.get()'
    // https://on.cypress.io/assertions
    const dataTestIdTestExample = await page.locator('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static')
  })

  test('cy.contains() - query DOM elements with matching content', async ({ page }) => {
    // https://on.cypress.io/contains
    const queryList = await page.locator('.query-list')
      .contains('bananas')
      .should('have.class', 'third')

    // we can pass a regexp to `.contains()`
    const queryList = await page.locator('.query-list')
      .contains(/^b\w+/)
      .should('have.class', 'third')

    const queryList = await page.locator('.query-list')
      .contains('apples')
      .should('have.class', 'first')

    // passing a selector to contains will
    // yield the selector containing the text
    const querying = await page.locator('#querying')
      .contains('ul', 'oranges')
      .should('have.class', 'query-list')

    const queryButton = await page.locator('.query-button')
      .contains('Save Form')
      .should('have.class', 'btn')
  })

  test('.within() - query DOM elements within a specific element', async ({ page }) => {
    // https://on.cypress.io/within
    const queryForm = await page.locator('.query-form').within(() => {
      const inputFirst = await page.locator('input:first').should('have.attr', 'placeholder', 'Email')
      const inputLast = await page.locator('input:last').should('have.attr', 'placeholder', 'Password')
    })
  })

  test('cy.root() - query the root DOM element', async ({ page }) => {
    // https://on.cypress.io/root

    // By default, root is the document
    cy.root().should('match', 'html')

    const queryUl = await page.locator('.query-ul').within(() => {
      // In this within, the root is now the ul DOM element
      cy.root().should('have.class', 'query-ul')
    })
  })

  test('best practices - selecting elements', async ({ page }) => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    const dataCyBestPracticesSelectingElements = await page.locator('[data-cy=best-practices-selecting-elements]').within(() => {
      // Worst - too generic, no context
      const button = await page.locator('button').click()

      // Bad. Coupled to styling. Highly subject to change.
      const btnBtnLarge = await page.locator('.btn.btn-large').click()

      // Average. Coupled to the `name` attribute which has HTML semantics.
      const nameSubmission = await page.locator('[name=submission]').click()

      // Better. But still coupled to styling or JS event listeners.
      const main = await page.locator('#main').click()

      // Slightly better. Uses an ID but also ensures the element
      // has an ARIA role attribute
      const mainRoleButton = await page.locator('#main[role=button]').click()

      // Much better. But still coupled to text content that may change.
      cy.contains('Submit').click()

      // Best. Insulated from all changes.
      const dataCySubmit = await page.locator('[data-cy=submit]').click()
    })
  })
})
