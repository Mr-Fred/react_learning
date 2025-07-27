import { render, screen } from '@testing-library/react'
import { describe, test, vi, expect, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import Todo from '../src/Todos/Todo'

describe('<Todo />', () => {
  let todo
  let mockDeleteTodo
  let mockCompleteTodo

  beforeEach(() => {
    todo = {
      _id: '60d0fe4f5311236168a109ca',
      text: 'Test this component',
      done: false,
    }

    mockDeleteTodo = vi.fn()
    mockCompleteTodo = vi.fn()

    render(
      <Todo
        todo={todo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    )
  })

  test('renders its content', () => {
    screen.getByText('Test this component')
    screen.getByText('This todo is not done')
  })

  test('clicking the "Set as done" button calls the event handler once', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Set as done')
    await user.click(button)

    expect(mockCompleteTodo).toHaveBeenCalledTimes(1)
  })
})
