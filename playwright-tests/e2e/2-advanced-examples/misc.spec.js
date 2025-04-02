import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Misc', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/misc')
  })

  test('cy.exec() - execute a system command', async ({ page }) => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec

    // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`)

    // on CircleCI Windows build machines we have a failure to run bash shell
    // https://github.com/cypress-io/cypress/issues/5169
    // so skip some of the tests by passing flag "--env circle=true"
    const isCircleOnWindows = Cypress.platform === 'win32' && Cypress.env('circle')

    if (isCircleOnWindows) {
      cy.log('Skipping test on CircleCI')

      return
    }

    // cy.exec problem on Shippable CI
    // https://github.com/cypress-io/cypress/issues/6718
    const isShippable = Cypress.platform === 'linux' && Cypress.env('shippable')

    if (isShippable) {
      cy.log('Skipping test on ShippableCI')

      return
    }

    cy.exec('echo Jane Lane')
      .its('stdout').should('contain', 'Jane Lane')

    if (Cypress.platform === 'win32') {
      cy.exec(`print ${Cypress.config('configFile')}`)
        .its('stderr').should('be.empty')
    } else {
      cy.exec(`cat ${Cypress.config('configFile')}`)
        .its('stderr').should('be.empty')

      cy.exec('pwd')
        .its('code').should('eq', 0)
    }
  })

  test('cy.focused() - get the DOM element that has focus', async ({ page }) => {
    // https://on.cypress.io/focused
    const miscForm = await page.locator('.misc-form').find('#name').click()
    cy.focused().should('have.id', 'name')

    const miscForm = await page.locator('.misc-form').find('#description').click()
    cy.focused().should('have.id', 'description')
  })

  context('Cypress.Screenshot', function () {
    test('cy.screenshot() - take a screenshot', async ({ page }) => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image')
    })

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot () { },
        onAfterScreenshot () { },
      })
    })
  })

  test('cy.wrap() - wrap an object', async ({ page }) => {
    // https://on.cypress.io/wrap
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar')
  })
})
