import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Connectors', () => {
  test.beforeEach(async (page) => {
    await page.goto('https://example.cypress.io/commands/connectors')
  })

  test('.each() - iterate over an array of elements', () => {
    // https://on.cypress.io/each
    const connectorsEachUlLi = await page.locator('.connectors-each-ul>li')
      .each(($el, index, $list) => {
        console.log($el, index, $list)
      })
  })

  test('.its() - get properties on the current subject', () => {
    // https://on.cypress.io/its
    const connectorsItsUlLi = await page.locator('.connectors-its-ul>li')
      // calls the 'length' property yielding that value
      .its('length')
      .should('be.gt', 2)
  })

  test('.invoke() - invoke a function on the current subject', () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    const connectorsDiv = await page.locator('.connectors-div').should('be.hidden')

    // https://on.cypress.io/invoke
    // call the jquery method 'show' on the 'div.container'
    const connectorsDiv = await page.locator('.connectors-div').invoke('show')

    const connectorsDiv = await page.locator('.connectors-div').should('be.visible')
  })

  test('.spread() - spread an array as individual args to callback function', () => {
    // https://on.cypress.io/spread
    const arr = ['foo', 'bar', 'baz']

    cy.wrap(arr).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo')
      expect(bar).to.eq('bar')
      expect(baz).to.eq('baz')
    })
  })

  describe('.then()', () => {
    test('invokes a callback function with the current subject', () => {
      // https://on.cypress.io/then
      const connectorsListLi = await page.locator('.connectors-list > li')
        .then(($lis) => {
          expect($lis, '3 items').to.have.length(3)
          expect($lis.eq(0), 'first item').to.contain('Walk the dog')
          expect($lis.eq(1), 'second item').to.contain('Feed the cat')
          expect($lis.eq(2), 'third item').to.contain('Write JavaScript')
        })
    })

    test('yields the returned value to the next command', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1)

          return 2
        })
        .then((num) => {
          expect(num).to.equal(2)
        })
    })

    test('yields the original subject without return', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1)
          // note that nothing is returned from this callback
        })
        .then((num) => {
          // this callback receives the original unchanged value 1
          expect(num).to.equal(1)
        })
    })

    test('yields the value yielded by the last Cypress command inside', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1)
          // note how we run a Cypress command
          // the result yielded by this Cypress command
          // will be passed to the second ".then"
          cy.wrap(2)
        })
        .then((num) => {
          // this callback receives the value yielded by "cy.wrap(2)"
          expect(num).to.equal(2)
        })
    })
  })
})
