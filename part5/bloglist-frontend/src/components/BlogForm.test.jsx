import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> calls createBlog with the correct details when a new blog is created', async () => {
  const mockCreateBlog = vi.fn(); // Mock the createBlog handler

  render(<BlogForm createBlog={mockCreateBlog} />);

  // Simulate user input
  const titleInput = screen.getByLabelText('Title:');
  const authorInput = screen.getByLabelText('Author:');
  const urlInput = screen.getByLabelText('Url:');
  const createButton = screen.getByText('create');

  await userEvent.type(titleInput, 'Test Blog Title');
  await userEvent.type(authorInput, 'Test Author');
  await userEvent.type(urlInput, 'http://testblog.com');
  await userEvent.click(createButton);

  // Ensure the mock handler was called once
  expect(mockCreateBlog.mock.calls).toHaveLength(1);

  // Check that the handler was called with the correct details
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Test Blog Title');
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Test Author');
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://testblog.com');
});
