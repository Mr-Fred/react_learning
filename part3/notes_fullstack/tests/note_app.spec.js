const { test, expect } = require('@playwright/test')
const helpers = require('./helper')

test.describe('Note App', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes', { exact: true })

    await expect(locator).toBeVisible()
    await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
  })

  test('login form can be opened & user can log in', async ({ page }) => {
    await helpers.loginWith(page, 'mluukkai', 'salainen')
    await expect(page.getByText('mluukkai logged-in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await helpers.loginWith(page, 'mluukkai', 'wrong')

    const errDiv = await page.locator('.error')
    await expect(errDiv).toContainText('wrong credentials')
    await expect(page.getByText('mluukkai logged-in')).not.toBeVisible()
  })

  test('a new user can sign up and log in', async ({ page }) => {
    await page.getByRole('button', { name: 'sign up' }).click()

    await page.getByTestId('name').fill('Test User')
    await page.getByTestId('username-signup').fill('testuser')
    await page.getByTestId('password-signup').fill('password')

    await page.getByRole('button', { name: 'Sign Up' }).click()

    const successNotification = await page.locator('.error')
    await expect(successNotification).toContainText('User testuser created successfully! Please log in.')
    await expect(successNotification).toBeVisible()

    await helpers.loginWith(page, 'testuser', 'password')
    await expect(page.getByText('testuser logged-in')).toBeVisible()
  })

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await helpers.loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new note can be created', async ({ page }) => {
      await helpers.createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
    test.describe('and several notes exists', () => {
      test.beforeEach(async ({ page }) => {
        await helpers.createNote(page, 'first note by Playwright')
        await helpers.createNote(page, 'second note by Playwright')
        // await helpers.createNote(page, 'another note by Playwright')
      })
      test('importance can be changed', async ({ page }) => {
        await page.getByRole('button', { name: 'make not important' }).click()
        await expect(page.getByRole('button', { name: 'make important' })).toBeVisible()
      })
    })
  })

})