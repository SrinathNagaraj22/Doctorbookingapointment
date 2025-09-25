import React from 'react'

function Createaccount() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className='container  w-25'>
      <h1>Create an account</h1>
      <p>Please create an account to book appointment</p>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFullName" className="form-label">Full name</label>
          <input type="text" className="form-control" id="exampleFullName"  pattern="[A-Za-z\s]+" />
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />  
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Create an account</button>
        <p className='mt-2'>Already have an account  <a href="/login">Login</a></p>
        
      </form>
    </div>
    </div>
  )
}

export default Createaccount
