import { render, screen } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import apiClient from '../src/util/apiClient'
import App from '../src/App'

describe('<App />', () => {
  test('renders the app and allows creating a new todo', async () => {
    // Mock the initial GET request to return an empty list of todos
    const getSpy = vi.spyOn(apiClient, 'get').mockResolvedValue({ data: [] })

    // Mock the POST request for creating a new todo
    const newTodoText = 'a new todo from a test'
    const newTodo = {
      _id: '60d0fe4f5311236168a109cb',
      text: newTodoText,
      done: false,
    }
    const postSpy = vi.spyOn(apiClient, 'post').mockResolvedValue({
      data: newTodo,
    })

    render(<App />)

    const user = userEvent.setup()

    const input = screen.getByRole('textbox')
    const submitButton = screen.getByText('Submit')

    // Simulate user input and click
    await user.type(input, newTodoText)
    await user.click(submitButton)

    // Assert that the new todo appears on the screen.
    const newTodoElement = await screen.findByText(newTodoText)
    expect(newTodoElement).toBeInTheDocument()

    // Assert that our mocks were called correctly
    expect(getSpy).toHaveBeenCalledOnce()
    expect(postSpy).toHaveBeenCalledOnce()
    expect(postSpy).toHaveBeenCalledWith('/todos', { text: newTodoText })
  })
})
