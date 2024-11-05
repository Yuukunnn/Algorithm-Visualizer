import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordField from './PasswordField';
import './css/login.css';
import './css/general.css';
import { TextField } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const { isLoggedIn, setIsLoggedIn, setAuthToken, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const ApiBaseURL = 'http://localhost:6688/api/user';

  useEffect(() => {
    //clear up error message and login success when input changes
    setEmailErr('');
    setPasswordErr('');
    setIsLoggedIn(false);
  }, [email, password]);
  useEffect(() => {
    //redirect to main page for logged in users
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Clear previous error messages
    setEmailErr('');
    setPasswordErr('');

    // Validate inputs
    if (!email) {
      setEmailErr('Email is required');
      return;
    }
    if (!password) {
      setPasswordErr('Password is required');
      return;
    }

    // Proceed with login API call if inputs are valid
    if (!email) {
      setEmailErr('Email is required');
      return;
    }
    if (!password) {
      setPasswordErr('Password is required');
      return;
    }

    // Proceed with login API call if inputs are valid
    axios
      .post(`${ApiBaseURL}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          setAuthToken(res.data.authToken);
          setUserData(res.data.userData);
        } else {
          setIsLoggedIn(false);
          setPasswordErr('Invalid email or password');
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log('err:', err);
      });
  };

  return (
    <div className='loginContainer'>
      <div className='loginHeader'>
        <img className='algoLogo' src='/images/algoLogo.png' alt='algoLogo' />
        <h1>Login</h1>
      </div>

      <div className='loginBody'>
        <form className='loginForm' onSubmit={(e) => handleLogin(e)}>
          <div className='inputGroup'>
            <TextField
              className='loginPasswordField'
              label='Email'
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              error={emailErr}
            />
          </div>

          <div className='inputGroup marginBottom'>
            <PasswordField
              className='loginPasswordField'
              label='Password'
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordErr}
            />
          </div>

          <button className='loginButton' type='submit'>
            Log in
          </button>
        </form>

        <div className='actionGroupContainer'>
          <div
            className='loginAction'
            onClick={() => {
              navigate('/resetpassword');
            }}
          >
            Reset Password
          </div>
          <div
            className='loginAction'
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign Up
          </div>
        </div>
      </div>

      <div className='loginFooter'>
        <small className='helpText'>Please follow website policies and user agreement</small>
      </div>
    </div>
  );
};

export default Login;
