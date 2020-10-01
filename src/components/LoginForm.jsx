import React from 'react'

const LoginForm = () => {
  return (
    <div>
      <form data-cy="login-form">
        <label >
          email:
        </label>
        <input data-cy="email" name="email" type="email" id="email"></input>
        <label>
          password:
        </label>
        <input data-cy="password" name="password" type="password" id="password"></input>
        <button data-cy="button">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
