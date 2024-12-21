import {render, screen} from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('<Blog /> renders title and author', async () => {
  const blog = {
    title: 'Blog 1',
    author: 'Robert C. Martin',
    likes: 10,
    url: 'http://localhost.com',
    creator: {
      name: 'John Doe'
    }
  }

  const {container} = render(
    <Blog blog={blog} />
  )

  // Check that title and author are displayed
  const blogSummary = container.querySelector('.blog-summary');
  expect(blogSummary).toHaveTextContent('Blog 1');
  expect(blogSummary).toHaveTextContent('Robert C. Martin');

  // Check that the URL and likes are not displayed by default
  const blogDetails = container.querySelector('.blog-details');
  expect(blogDetails).toHaveStyle({ display: 'none' });
})


test('<Blog /> shows URL and likes after clicking the "view" button', async () => {
  const blog = {
    title: 'Blog 1',
    author: 'Robert C. Martin',
    likes: 10,
    url: 'http://localhost.com',
    creator: {
      name: 'John Doe',
    },
  };

  const { container } = render(<Blog blog={blog} />);

  // Confirm that URL and likes are hidden initially
  const blogDetails = container.querySelector('.blog-details');
  expect(blogDetails).toHaveStyle({ display: 'none' });

  // Simulate user clicking the "view" button
  const viewButton = screen.getByText('view');
  await userEvent.click(viewButton);

  // Confirm that URL and likes are now visible
  expect(blogDetails).not.toHaveStyle({ display: 'none' });
  expect(blogDetails).toHaveTextContent('Url: http://localhost.com');
  expect(blogDetails).toHaveTextContent('Likes: 10');
});

test('<Blog /> calls the like handler twice when the like button is clicked twice', async () => {
  const blog = {
    title: 'Blog 1',
    author: 'Robert C. Martin',
    likes: 10,
    url: 'http://localhost.com',
    creator: {
      name: 'John Doe',
    },
  };

  const mockUpdateBlog = vi.fn();

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);

  // Simulate user clicking the "view" button to show the like button
  const viewButton = screen.getByText('view');
  await userEvent.click(viewButton);

  // Find the like button and click it twice
  const likeButton = screen.getByText('like');
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  // Ensure the handler is called twice
  expect(mockUpdateBlog.mock.calls).toHaveLength(2);
});

