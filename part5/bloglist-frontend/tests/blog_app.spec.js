import {test, expect} from '@playwright/test'
import { loginWith, createBlog } from './helper'

test.describe('Blog App', () => {
  test.beforeEach( async({page, request}) => {
    await request.post('/api/testing/reset')
    await request.post('/api/creators', {
      data: {
        username: 'johndoe123',
        name: 'John Doe',
        password: 'hashedpassword1'
      }
    })
    await page.goto('/')
  })
  test('login form is displayed on login button click and close on cancel', async ({ page }) => {
    await page.getByText('Log in to application')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByRole('textbox', { name: 'username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()

    await page.getByRole('button', { name: 'cancel' }).click()
    await expect(page.getByRole('textbox', { name: 'password' })).not.toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username' })).not.toBeVisible()
  })
  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'johndoe123', 'hashedpassword1')
      await expect(page.getByText('John Doe logged in')).toBeVisible()
    })

    test('Failed with wrong credentientials', async ({page}) => {
      await loginWith(page, 'johndoe123', 'wrongpassword')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({page}) => {
      await loginWith(page, 'johndoe123', 'hashedpassword1')
      // await createBlog(page, 'test Blog', 'Robert C. Martin', 'http://localhost.com')
    })
    
    test('a new blog can be created', async ({ page }) => {
      const title = 'a new blog by playwright'
      await createBlog(page, title, 'Fred Ade', '/test-blog')
      await expect(page.locator('.notification')).toBeVisible()
      await expect(page.getByRole('heading', { name: 'a new blog by playwright by Fred Ade' })).toBeVisible()
      const newBlog = page.getByRole('heading', { name: title }).locator('..')
      await expect(newBlog.getByRole('button', { name: 'view'})).toBeVisible()
    })
    test('a blog can be liked', async ({ page }) => {
      const blog = {
        title: 'another blog by playwright',
        author: 'test author',
        url: '/blog-2'
      }
      await createBlog(page, blog.title, blog.author, blog.url)
      const blogDiv = page.getByRole('heading', { name: blog.title }).locator('..')
      // const blogDiv = page.getByText(blog.title).locator('..')
      await blogDiv.getByRole('button', { name: 'view'}).click()

      const likes = blogDiv.getByText('Likes: ')
      await blogDiv.getByRole('button', {name: 'like'}).click()
      await expect(likes).toContainText('1')
      expect (await likes.evaluate(node => node.textContent)).toBe('Likes: 1')

      await blogDiv.getByRole('button', {name: 'like'}).click()
      await expect(likes).toContainText('2')
      expect (await likes.evaluate(node => node.textContent)).toBe('Likes: 2')
    })

    test('owner can delete a blog', async ({ page }) => {
      const blog = {
        title: 'another blog',
        author: 'test author 2',
        url: '/blog-3'
      }
      await createBlog(page, blog.title, blog.author, blog.url)
      const blogDiv = page.getByRole('heading', { name: blog.title }).locator('..')
      await blogDiv.getByRole('button', { name: 'view'}).click()

      page.on('dialog', dialog => dialog.accept())
      await blogDiv.getByRole('button', { name: 'remove'}).click()

      await expect(page.getByText(`Blog another blog deleted successfully!`)).toBeVisible()
      await expect(blogDiv).not.toBeVisible()
    })

    test('blogs are arranged according to likes', async({page}) => {
      const blog1 = {
        title: 'blog 1 title',
        author: 'test',
        url: '/blog-1'
      }
      const blog2 = {
        title: 'blog 2 title',
        author: 'test',
        url: '/blog-2'
      }
      await createBlog(page, blog1.title, blog1.author, blog1.url)
      await createBlog(page, blog2.title, blog2.author, blog2.url)

      // Like blog 2
      const blog2Div = page.getByRole('heading', { name: blog2.title }).locator('..');
      await blog2Div.getByRole('button', { name: 'view' }).click();
      await blog2Div.getByRole('button', { name: 'like' }).click();
      await expect(blog2Div.locator('.blog-likes')).toContainText('Likes: 1');

       // Reload to ensure sorting is reflected
      await page.reload();

       // Open all blogs to ensure likes are visible
      const viewButtons = await page.getByRole('button', { name: 'view' }).all();
      for (const button of viewButtons) {
        await button.click();
      }

      // Verify that blogs are sorted by likes
      const blogLikes = await page.$$eval('.blog', (blogs) =>
        blogs.map((blog) => {
          const likesText = blog.querySelector('.blog-likes').textContent;
          console.log(likesText)
          return parseInt(likesText.replace('Likes: ', ''), 10);
        }
      ));

      // Assert the likes are sorted in descending order
      const sortedLikes = [...blogLikes].sort((a, b) => b - a);
      expect(blogLikes).toEqual(sortedLikes);
    })
  })
})