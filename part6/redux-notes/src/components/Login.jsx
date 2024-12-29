import {
  useNavigate
} from 'react-router-dom'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import useLogin from '../services/loginService'
import { setUser, setError } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const username = useField('text')
  const password = useField('password')
  const user = useSelector(({ login }) => login.user)

  const { mutate: login} = useLogin();

  const onSubmit = (event) => {
    event.preventDefault();
    login({
      username: username.value,
      password: password.value,
    });
    navigate('/');
  }

  return (
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}

export default Login