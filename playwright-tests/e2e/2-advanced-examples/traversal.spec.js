import { test, expect } from '@playwright/test';
/// <reference types="cypress" />

context('Traversal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.cypress.io/commands/traversal')
  })

  test('.children() - get child DOM elements', async ({ page }) => {
    // https://on.cypress.io/children
    const traversalBreadcrumb = await page.locator('.traversal-breadcrumb')
      .children('.active')
      .should('contain', 'Data')
  })

  test('.closest() - get closest ancestor DOM element', async ({ page }) => {
    // https://on.cypress.io/closest
    const traversalBadge = await page.locator('.traversal-badge')
      .closest('ul')
      .should('have.class', 'list-group')
  })

  test('.eq() - get a DOM element at a specific index', async ({ page }) => {
    // https://on.cypress.io/eq
    const traversalListLi = await page.locator('.traversal-list>li')
      .eq(1).should('contain', 'siamese')
  })

  test('.filter() - get DOM elements that match the selector', async ({ page }) => {
    // https://on.cypress.io/filter
    const traversalNavLi = await page.locator('.traversal-nav>li')
      .filter('.active').should('contain', 'About')
  })

  test('.find() - get descendant DOM elements of the selector', async ({ page }) => {
    // https://on.cypress.io/find
    const traversalPagination = await page.locator('.traversal-pagination')
      .find('li').find('a')
      .should('have.length', 7)
  })

  test('.first() - get first DOM element', async ({ page }) => {
    // https://on.cypress.io/first
    const traversalTableTd = await page.locator('.traversal-table td')
      .first().should('contain', '1')
  })

  test('.last() - get last DOM element', async ({ page }) => {
    // https://on.cypress.io/last
    const traversalButtonsBtn = await page.locator('.traversal-buttons .btn')
      .last().should('contain', 'Submit')
  })

  test('.next() - get next sibling DOM element', async ({ page }) => {
    // https://on.cypress.io/next
    const traversalUl = await page.locator('.traversal-ul')
      .contains('apples').next().should('contain', 'oranges')
  })

  test('.nextAll() - get all next sibling DOM elements', async ({ page }) => {
    // https://on.cypress.io/nextall
    const traversalNextAll = await page.locator('.traversal-next-all')
      .contains('oranges')
      .nextAll().should('have.length', 3)
  })

  test('.nextUntil() - get next sibling DOM elements until next el', async ({ page }) => {
    // https://on.cypress.io/nextuntil
    const veggies = await page.locator('#veggies')
      .nextUntil('#nuts').should('have.length', 3)
  })

  test('.not() - remove DOM elements from set of DOM elements', async ({ page }) => {
    // https://on.cypress.io/not
    const traversalDisabledBtn = await page.locator('.traversal-disabled .btn')
      .not('[disabled]').should('not.contain', 'Disabled')
  })

  test('.parent() - get parent DOM element from DOM elements', async ({ page }) => {
    // https://on.cypress.io/parent
    const traversalMark = await page.locator('.traversal-mark')
      .parent().should('contain', 'Morbi leo risus')
  })

  test('.parents() - get parent DOM elements from DOM elements', async ({ page }) => {
    // https://on.cypress.io/parents
    const traversalCite = await page.locator('.traversal-cite')
      .parents().should('match', 'blockquote')
  })

  test('.parentsUntil() - get parent DOM elements from DOM elements until el', async ({ page }) => {
    // https://on.cypress.io/parentsuntil
    const clothesNav = await page.locator('.clothes-nav')
      .find('.active')
      .parentsUntil('.clothes-nav')
      .should('have.length', 2)
  })

  test('.prev() - get previous sibling DOM element', async ({ page }) => {
    // https://on.cypress.io/prev
    const birds = await page.locator('.birds').find('.active')
      .prev().should('contain', 'Lorikeets')
  })

  test('.prevAll() - get all previous sibling DOM elements', async ({ page }) => {
    // https://on.cypress.io/prevall
    const fruitsList = await page.locator('.fruits-list').find('.third')
      .prevAll().should('have.length', 2)
  })

  test('.prevUntil() - get all previous sibling DOM elements until el', async ({ page }) => {
    // https://on.cypress.io/prevuntil
    const foodsList = await page.locator('.foods-list').find('#nuts')
      .prevUntil('#veggies').should('have.length', 3)
  })

  test('.siblings() - get all sibling DOM elements', async ({ page }) => {
    // https://on.cypress.io/siblings
    const traversalPillsActive = await page.locator('.traversal-pills .active')
      .siblings().should('have.length', 2)
  })
})
