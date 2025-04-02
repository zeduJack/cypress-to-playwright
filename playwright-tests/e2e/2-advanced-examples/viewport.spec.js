import { test, expect } from '@playwright/test';
/// <reference types="cypress" />
context('Viewport', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/viewport')
  })

  test('cy.viewport() - set the viewport size and dimension', async ({ page }) => {
    // https://on.cypress.io/viewport

    const navbar = await page.locator('#navbar').should('be.visible')
    cy.viewport(320, 480)

    // the navbar should have collapse since our screen is smaller
    const navbar = await page.locator('#navbar').should('not.be.visible')
    const navbarToggle = await page.locator('.navbar-toggle').should('be.visible').click()
    const nav = await page.locator('.nav').find('a').should('be.visible')

    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999)

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15')
    cy.wait(200)
    cy.viewport('macbook-13')
    cy.wait(200)
    cy.viewport('macbook-11')
    cy.wait(200)
    cy.viewport('ipad-2')
    cy.wait(200)
    cy.viewport('ipad-mini')
    cy.wait(200)
    cy.viewport('iphone-6+')
    cy.wait(200)
    cy.viewport('iphone-6')
    cy.wait(200)
    cy.viewport('iphone-5')
    cy.wait(200)
    cy.viewport('iphone-4')
    cy.wait(200)
    cy.viewport('iphone-3')
    cy.wait(200)

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'
    cy.viewport('ipad-2', 'portrait')
    cy.wait(200)
    cy.viewport('iphone-4', 'landscape')
    cy.wait(200)

    // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.config.{js|ts})
  })
})
