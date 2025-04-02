import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Utilities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/utilities')
  })

  test('Cypress._ - call a lodash method', async ({ page }) => {
    // https://on.cypress.io/_
    cy.request('https://jsonplaceholder.cypress.io/users')
      .then((response) => {
        let ids = Cypress._.chain(response.body).map('id').take(3).value()

        expect(ids).to.deep.eq([1, 2, 3])
      })
  })

  test('Cypress.$ - call a jQuery method', async ({ page }) => {
    // https://on.cypress.io/$
    let $li = Cypress.$('.utility-jquery li:first')

    cy.wrap($li).should('not.have.class', 'active')
    cy.wrap($li).click()
    cy.wrap($li).should('have.class', 'active')
  })

  test('Cypress.Blob - blob utilities and base64 string conversion', async ({ page }) => {
    // https://on.cypress.io/blob
    const utilityBlob = await page.locator('.utility-blob').then(($div) => {
      // https://github.com/nolanlawson/blob-util#imgSrcToDataURL
      // get the dataUrl string for the javascript-logo
      return Cypress.Blob.imgSrcToDataURL('https://example.cypress.io/assets/img/javascript-logo.png', undefined, 'anonymous')
      .then((dataUrl) => {
        // create an <img> element and set its src to the dataUrl
        let img = Cypress.$('<img />', { src: dataUrl })

        // need to explicitly return cy here since we are initially returning
        // the Cypress.Blob.imgSrcToDataURL promise to our test
        // append the image
        $div.append(img)

        const utilityBlobImg = await page.locator('.utility-blob img').click()
        const utilityBlobImg = await page.locator('.utility-blob img').should('have.attr', 'src', dataUrl)
      })
    })
  })

  test('Cypress.minimatch - test out glob patterns against strings', async ({ page }) => {
    // https://on.cypress.io/minimatch
    let matching = Cypress.minimatch('/users/1/comments', '/users/*/comments', {
      matchBase: true,
    })

    expect(matching, 'matching wildcard').to.be.true

    matching = Cypress.minimatch('/users/1/comments/2', '/users/*/comments', {
      matchBase: true,
    })

    expect(matching, 'comments').to.be.false

    // ** matches against all downstream path segments
    matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/**', {
      matchBase: true,
    })

    expect(matching, 'comments').to.be.true

    // whereas * matches only the next path segment

    matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/*', {
      matchBase: false,
    })

    expect(matching, 'comments').to.be.false
  })

  test('Cypress.Promise - instantiate a bluebird promise', async ({ page }) => {
    // https://on.cypress.io/promise
    let waited = false

    /**
     * @return Bluebird<string>
     */
    function waitOneSecond () {
      // return a promise that resolves after 1 second
      return new Cypress.Promise((resolve, reject) => {
        setTimeout(() => {
          // set waited to true
          waited = true

          // resolve with 'foo' string
          resolve('foo')
        }, 1000)
      })
    }

    cy.then(() => {
      // return a promise to cy.then() that
      // is awaited until it resolves
      return waitOneSecond().then((str) => {
        expect(str).to.eq('foo')
        expect(waited).to.be.true
      })
    })
  })
})
