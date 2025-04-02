import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/actions')
  })

  // https://on.cypress.io/interacting-with-elements

  test('.type() - type into a DOM element', async ({ page }) => {
    // https://on.cypress.io/type
    const actionEmail = await page.locator('.action-email').type('fake@email.com')
    const actionEmail = await page.locator('.action-email').should('have.value', 'fake@email.com')

    // .type() with special character sequences
    const actionEmail = await page.locator('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    const actionEmail = await page.locator('.action-email').type('{del}{selectall}{backspace}')

    // .type() with key modifiers
    const actionEmail = await page.locator('.action-email').type('{alt}{option}') //these are equivalent
    const actionEmail = await page.locator('.action-email').type('{ctrl}{control}') //these are equivalent
    const actionEmail = await page.locator('.action-email').type('{meta}{command}{cmd}') //these are equivalent
    const actionEmail = await page.locator('.action-email').type('{shift}')

    // Delay each keypress by 0.1 sec
    const actionEmail = await page.locator('.action-email').type('slow.typing@email.com', { delay: 100 })
    const actionEmail = await page.locator('.action-email').should('have.value', 'slow.typing@email.com')

    const actionDisabled = await page.locator('.action-disabled')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('disabled error checking', { force: true })
    const actionDisabled = await page.locator('.action-disabled').should('have.value', 'disabled error checking')
  })

  test('.focus() - focus on a DOM element', async ({ page }) => {
    // https://on.cypress.io/focus
    const actionFocus = await page.locator('.action-focus').focus()
    const actionFocus = await page.locator('.action-focus').should('have.class', 'focus')
      .prev().should('have.attr', 'style', 'color: orange;')
  })

  test('.blur() - blur off a DOM element', async ({ page }) => {
    // https://on.cypress.io/blur
    const actionBlur = await page.locator('.action-blur').type('About to blur')
    const actionBlur = await page.locator('.action-blur').blur()
    const actionBlur = await page.locator('.action-blur').should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')
  })

  test('.clear() - clears an input or textarea element', async ({ page }) => {
    // https://on.cypress.io/clear
    const actionClear = await page.locator('.action-clear').type('Clear this text')
    const actionClear = await page.locator('.action-clear').should('have.value', 'Clear this text')
    const actionClear = await page.locator('.action-clear').clear()
    const actionClear = await page.locator('.action-clear').should('have.value', '')
  })

  test('.submit() - submit a form', async ({ page }) => {
    // https://on.cypress.io/submit
    const actionForm = await page.locator('.action-form')
      .find('[type="text"]').type('HALFOFF')

    const actionForm = await page.locator('.action-form').submit()
    const actionForm = await page.locator('.action-form').next().should('contain', 'Your form has been submitted!')
  })

  test('.click() - click on a DOM element', async ({ page }) => {
    // https://on.cypress.io/click
    const actionBtn = await page.locator('.action-btn').click()

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    const actionCanvas = await page.locator('#action-canvas').click()

    const actionCanvas = await page.locator('#action-canvas').click('topLeft')
    const actionCanvas = await page.locator('#action-canvas').click('top')
    const actionCanvas = await page.locator('#action-canvas').click('topRight')
    const actionCanvas = await page.locator('#action-canvas').click('left')
    const actionCanvas = await page.locator('#action-canvas').click('right')
    const actionCanvas = await page.locator('#action-canvas').click('bottomLeft')
    const actionCanvas = await page.locator('#action-canvas').click('bottom')
    const actionCanvas = await page.locator('#action-canvas').click('bottomRight')

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    const actionCanvas = await page.locator('#action-canvas')
    const actionCanvas = await page.locator('#action-canvas').click(80, 75) // click 80px on x coord and 75px on y coord
    const actionCanvas = await page.locator('#action-canvas').click(170, 75)
    const actionCanvas = await page.locator('#action-canvas').click(80, 165)
    const actionCanvas = await page.locator('#action-canvas').click(100, 185)
    const actionCanvas = await page.locator('#action-canvas').click(125, 190)
    const actionCanvas = await page.locator('#action-canvas').click(150, 185)
    const actionCanvas = await page.locator('#action-canvas').click(170, 165)

    // click multiple elements by passing multiple: true
    const actionLabelsLabel = await page.locator('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    const actionOpacityBtn = await page.locator('.action-opacity>.btn').click({ force: true })
  })

  test('.dblclick() - double click on a DOM element', async ({ page }) => {
    // https://on.cypress.io/dblclick

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    const actionDiv = await page.locator('.action-div').dblclick()
    const actionDiv = await page.locator('.action-div').should('not.be.visible')
    const actionInputHidden = await page.locator('.action-input-hidden').should('be.visible')
  })

  test('.rightclick() - right click on a DOM element', async ({ page }) => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    const rightclickActionDiv = await page.locator('.rightclick-action-div').rightclick()
    const rightclickActionDiv = await page.locator('.rightclick-action-div').should('not.be.visible')
    const rightclickActionInputHidden = await page.locator('.rightclick-action-input-hidden').should('be.visible')
  })

  test('.check() - check a checkbox or radio element', async ({ page }) => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    const actionCheckboxesTypeCheckbox = await page.locator('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
    const actionCheckboxesTypeCheckbox = await page.locator('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')

    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').not('[disabled]').check()
    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').not('[disabled]').should('be.checked')

    // .check() accepts a value argument
    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').check('radio1')
    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').should('be.checked')

    // .check() accepts an array of values
    const actionMultipleCheckboxesTypeCheckbox = await page.locator('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2'])
    const actionMultipleCheckboxesTypeCheckbox = await page.locator('.action-multiple-checkboxes [type="checkbox"]').should('be.checked')

    // Ignore error checking prior to checking
    const actionCheckboxesDisabled = await page.locator('.action-checkboxes [disabled]').check({ force: true })
    const actionCheckboxesDisabled = await page.locator('.action-checkboxes [disabled]').should('be.checked')

    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').check('radio3', { force: true })
    const actionRadiosTypeRadio = await page.locator('.action-radios [type="radio"]').should('be.checked')
  })

  test('.uncheck() - uncheck a checkbox element', async ({ page }) => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck()
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .not('[disabled]')
      .should('not.be.checked')

    // .uncheck() accepts a value argument
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .check('checkbox1')
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .uncheck('checkbox1')
    const actionCheckTypeCheckboxValueCheckbox1 = await page.locator('.action-check [type="checkbox"][value="checkbox1"]')
      .should('not.be.checked')

    // .uncheck() accepts an array of values
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
    const actionCheckTypeCheckbox = await page.locator('.action-check [type="checkbox"]')
      .uncheck(['checkbox1', 'checkbox3'])
    const actionCheckTypeCheckboxValueCheckbox1 = await page.locator('.action-check [type="checkbox"][value="checkbox1"]')
      .should('not.be.checked')
    const actionCheckTypeCheckboxValueCheckbox3 = await page.locator('.action-check [type="checkbox"][value="checkbox3"]')
      .should('not.be.checked')

    // Ignore error checking prior to unchecking
    const actionCheckDisabled = await page.locator('.action-check [disabled]').uncheck({ force: true })
    const actionCheckDisabled = await page.locator('.action-check [disabled]').should('not.be.checked')
  })

  test('.select() - select an option in a <select> element', async ({ page }) => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    const actionSelect = await page.locator('.action-select')
      .should('have.value', '--Select a fruit--')

    // Select option(s) with matching text content
    const actionSelect = await page.locator('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    const actionSelect = await page.locator('.action-select').should('have.value', 'fr-apples')

    const actionSelectMultiple = await page.locator('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
    const actionSelectMultiple = await page.locator('.action-select-multiple')
      // when getting multiple values, invoke "val" method first
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // Select option(s) with matching value
    const actionSelect = await page.locator('.action-select').select('fr-bananas')
    const actionSelect = await page.locator('.action-select')
      // can attach an assertion right away to the element
      .should('have.value', 'fr-bananas')

    const actionSelectMultiple = await page.locator('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
    const actionSelectMultiple = await page.locator('.action-select-multiple')
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // assert the selected values include oranges
    const actionSelectMultiple = await page.locator('.action-select-multiple')
      .invoke('val').should('include', 'fr-oranges')
  })

  test('.scrollIntoView() - scroll an element into view', async ({ page }) => {
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    const scrollHorizontalButton = await page.locator('#scroll-horizontal button')
      .should('not.be.visible')

    // scroll the button into view, as if the user had scrolled
    const scrollHorizontalButton = await page.locator('#scroll-horizontal button').scrollIntoView()
    const scrollHorizontalButton = await page.locator('#scroll-horizontal button')
      .should('be.visible')

    const scrollVerticalButton = await page.locator('#scroll-vertical button')
      .should('not.be.visible')

    // Cypress handles the scroll direction needed
    const scrollVerticalButton = await page.locator('#scroll-vertical button').scrollIntoView()
    const scrollVerticalButton = await page.locator('#scroll-vertical button')
      .should('be.visible')

    const scrollBothButton = await page.locator('#scroll-both button')
      .should('not.be.visible')

    // Cypress knows to scroll to the right and down
    const scrollBothButton = await page.locator('#scroll-both button').scrollIntoView()
    const scrollBothButton = await page.locator('#scroll-both button')
      .should('be.visible')
  })

  test('.trigger() - trigger an event on a DOM element', async ({ page }) => {
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    const triggerInputRange = await page.locator('.trigger-input-range')
      .invoke('val', 25)
    const triggerInputRange = await page.locator('.trigger-input-range')
      .trigger('change')
    const triggerInputRange = await page.locator('.trigger-input-range')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
  })

  test('cy.scrollTo() - scroll the window or element to a position', async ({ page }) => {
    // https://on.cypress.io/scrollto

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom')

    const scrollableHorizontal = await page.locator('#scrollable-horizontal').scrollTo('right')

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    const scrollableVertical = await page.locator('#scrollable-vertical').scrollTo(250, 250)

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    const scrollableBoth = await page.locator('#scrollable-both').scrollTo('75%', '25%')

    // control the easing of the scroll (default is 'swing')
    const scrollableVertical = await page.locator('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

    // control the duration of the scroll (in ms)
    const scrollableBoth = await page.locator('#scrollable-both').scrollTo('center', { duration: 2000 })
  })
})
