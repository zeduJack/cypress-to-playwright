import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Local Storage / Session Storage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/storage')
  })
  // Although localStorage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear localStorage manually

  test('cy.clearLocalStorage() - clear all data in localStorage for the current origin', async ({ page }) => {
    // https://on.cypress.io/clearlocalstorage
    const lsBtn = await page.locator('.ls-btn').click()
    const lsBtn = await page.locator('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red')
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })

    cy.clearLocalStorage()
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null
      expect(localStorage.getItem('prop2')).to.be.null
      expect(localStorage.getItem('prop3')).to.be.null
    })

    const lsBtn = await page.locator('.ls-btn').click()
    const lsBtn = await page.locator('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red')
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })

    // Clear key matching string in localStorage
    cy.clearLocalStorage('prop1')
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })

    const lsBtn = await page.locator('.ls-btn').click()
    const lsBtn = await page.locator('.ls-btn').should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red')
      expect(localStorage.getItem('prop2')).to.eq('blue')
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })

    // Clear keys matching regex in localStorage
    cy.clearLocalStorage(/prop1|2/)
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null
      expect(localStorage.getItem('prop2')).to.be.null
      expect(localStorage.getItem('prop3')).to.eq('magenta')
    })
  })

  test('cy.getAllLocalStorage() - get all data in localStorage for all origins', async ({ page }) => {
    // https://on.cypress.io/getalllocalstorage
    const lsBtn = await page.locator('.ls-btn').click()

    // getAllLocalStorage() yields a map of origins to localStorage values
    cy.getAllLocalStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        // other origins will also be present if localStorage is set on them
        'https://example.cypress.io': {
          'prop1': 'red',
          'prop2': 'blue',
          'prop3': 'magenta',
        },
      })
    })
  })

  test('cy.clearAllLocalStorage() - clear all data in localStorage for all origins', async ({ page }) => {
    // https://on.cypress.io/clearalllocalstorage
    const lsBtn = await page.locator('.ls-btn').click()

    // clearAllLocalStorage() yields null
    cy.clearAllLocalStorage()
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null
      expect(localStorage.getItem('prop2')).to.be.null
      expect(localStorage.getItem('prop3')).to.be.null
    })
  })

  test('cy.getAllSessionStorage() - get all data in sessionStorage for all origins', async ({ page }) => {
    // https://on.cypress.io/getallsessionstorage
    const lsBtn = await page.locator('.ls-btn').click()

    // getAllSessionStorage() yields a map of origins to sessionStorage values
    cy.getAllSessionStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        // other origins will also be present if sessionStorage is set on them
        'https://example.cypress.io': {
          'prop4': 'cyan',
          'prop5': 'yellow',
          'prop6': 'black',
        },
      })
    })
  })

  test('cy.clearAllSessionStorage() - clear all data in sessionStorage for all origins', async ({ page }) => {
    // https://on.cypress.io/clearallsessionstorage
    const lsBtn = await page.locator('.ls-btn').click()

    // clearAllSessionStorage() yields null
    cy.clearAllSessionStorage()
    cy.getAllSessionStorage().should(() => {
      expect(sessionStorage.getItem('prop4')).to.be.null
      expect(sessionStorage.getItem('prop5')).to.be.null
      expect(sessionStorage.getItem('prop6')).to.be.null
    })
  })
})
