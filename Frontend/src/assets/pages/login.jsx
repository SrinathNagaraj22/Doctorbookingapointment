import React from 'react'

function Login() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className='container  w-25'>
      <h1>Login</h1>
      <p>Please login to Book appointment</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />  
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
    </div>
  )
}

export default Login
