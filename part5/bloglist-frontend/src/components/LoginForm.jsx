import { useState } from "react"

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => {

  return(

    <div>

      <form onSubmit={handleLogin}>
        <label htmlFor="username" >Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm