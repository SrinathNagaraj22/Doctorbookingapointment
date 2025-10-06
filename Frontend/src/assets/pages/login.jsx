import React, { useContext, useState, useEffect } from 'react';
import { Appcontext } from '../context/appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function Loginorcreateaccount() {
  const { backendUrl, setToken } = useContext(Appcontext);
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname === '/login') setIsLogin(true);
    else if (location.pathname === '/createaccount') setIsLogin(false);

    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      navigate('/');
    }
  }, [location.pathname, setToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login successful');
          navigate('/')
        } else {
          toast.error(data.message);
        }
      } else {
        if (!name) {
          toast.error('Please enter your name');
          return;
        }
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Account created successfully');
          navigate('/')
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='container w-25'>
        <h1>{isLogin ? 'Login' : 'Create an account'}</h1>
        <p>{isLogin ? 'Please login to book appointment' : 'Please create an account to book appointment'}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {!isLogin && (
              <>
                <label htmlFor="name" className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  pattern="[A-Za-z\s]+" 
                  required
                  autoComplete='name'
                />
              </>
            )}

            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
              autoComplete='email'
            />

            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
              autoComplete='password'
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p className='mt-2'>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span 
            style={{ color: 'blue', cursor: 'pointer' }} 
            onClick={() => {
              setIsLogin(!isLogin);
              navigate(isLogin ? '/createaccount' : '/login'); 
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Loginorcreateaccount;
