import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Assertions', () => {
  test.beforeEach(async (page) => {
    await page.goto('https://example.cypress.io/commands/assertions')
  })

  describe('Implicit Assertions', () => {
    test('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      const assertionTable = await page.locator('.assertion-table')
        .find('tbody tr:last')
        .should('have.class', 'success')
        .find('td')
        .first()
        // checking the text of the <td> element in various ways
        .should('have.text', 'Column content')
        .should('contain', 'Column content')
        .should('have.html', 'Column content')
        // chai-jquery uses "is()" to check if element matches selector
        .should('match', 'td')
        // to match text content against a regular expression
        // first need to invoke jQuery method text()
        // and then match using regular expression
        .invoke('text')
        .should('match', /column content/i)

      // a better way to check element's text content against a regular expression
      // is to use "cy.contains"
      // https://on.cypress.io/contains
      const assertionTable = await page.locator('.assertion-table')
        .find('tbody tr:last')
        // finds first <td> element with text content matching regular expression
        .contains('td', /column content/i)
        .should('be.visible')

      // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
    })

    test('.and() - chain multiple assertions together', () => {
      // https://on.cypress.io/and
      const assertionsLink = await page.locator('.assertions-link')
        .should('have.class', 'active')
        .and('have.attr', 'href')
        .and('include', 'cypress.io')
    })
  })

  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    test('expect - make an assertion about a specified subject', () => {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true
      const o = { foo: 'bar' }

      expect(o).to.equal(o)
      expect(o).to.deep.equal({ foo: 'bar' })
      // matching text using regular expression
      expect('FooBar').to.match(/bar$/i)
    })

    test('pass your own callback function to should()', () => {
      // Pass a function to should that can have any number
      // of explicit assertions within it.
      // The ".should(cb)" function will be retried
      // automatically until it passes all your explicit assertions or times out.
      const assertionsP = await page.locator('.assertions-p')
        .find('p')
        .should(($p) => {
          // https://on.cypress.io/$
          // return an array of texts from all of the p's
          const texts = $p.map((i, el) => Cypress.$(el).text())

          // jquery map returns jquery object
          // and .get() convert this to simple array
          const paragraphs = texts.get()

          // array should have length of 3
          expect(paragraphs, 'has 3 paragraphs').to.have.length(3)

          // use second argument to expect(...) to provide clear
          // message with each assertion
          expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
            'Some text from first p',
            'More text from second p',
            'And even more text from third p',
          ])
        })
    })

    test('finds element by class name regex', () => {
      const docsHeader = await page.locator('.docs-header')
        .find('div')
        // .should(cb) callback function will be retried
        .should(($div) => {
          expect($div).to.have.length(1)

          const className = $div[0].className

          expect(className).to.match(/heading-/)
        })
        // .then(cb) callback is not retried,
        // it either passes or fails
        .then(($div) => {
          expect($div, 'text content').to.have.text('Introduction')
        })
    })

    test('can throw any error', () => {
      const docsHeader = await page.locator('.docs-header')
        .find('div')
        .should(($div) => {
          if ($div.length !== 1) {
            // you can throw your own errors
            throw new Error('Did not find 1 element')
          }

          const className = $div[0].className

          if (!className.match(/heading-/)) {
            throw new Error(`Could not find class "heading-" in ${className}`)
          }
        })
    })

    test('matches unknown text between two elements', () => {
      /**
       * Text from the first element.
       * @type {string}
      */
      let text

      /**
       * Normalizes passed text,
       * useful before comparing text with spaces and different capitalization.
       * @param {string} s Text to normalize
      */
      const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

      const twoElements = await page.locator('.two-elements')
        .find('.first')
        .then(($first) => {
          // save text from the first element
          text = normalizeText($first.text())
        })

      const twoElements = await page.locator('.two-elements')
        .find('.second')
        .should(($div) => {
          // we can massage text before comparing
          const secondText = normalizeText($div.text())

          expect(secondText, 'second text').to.equal(text)
        })
    })

    test('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20,
      }

      assert.isObject(person, 'value is object')
    })

    test('retries the should callback until assertions pass', () => {
      const randomNumber = await page.locator('#random-number')
        .should(($div) => {
          const n = parseFloat($div.text())

          expect(n).to.be.gte(1).and.be.lte(10)
        })
    })
  })
})
