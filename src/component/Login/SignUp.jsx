import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import PasswordField from './PasswordField';
import './css/signup.css';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const ApiBaseURL = 'http://localhost:6688/api/user';
  useEffect(() => {
    //clear up error message and register success when input changes
    setEmailErr('');
    setPasswordErr('');
    setRegisterSuccess(false);
  }, [email, password]);

  const handleUserSignUp = (e) => {
    e.preventDefault();

    if (!isValidEmail()) {
      setEmailErr('Invalid Email Input');
      return;
    }
    if (!isValidPassword()) {
      setPasswordErr(
        'Password must be at least 8 characters inlcuding uppercase, lowercase, number and special character'
      );
      return;
    }

    if (isValidEmail() && isValidPassword()) {
      axios
        .post(`${ApiBaseURL}/register`, {
          email: email,
          password: password,
        })
        .then((res) => {
          if (!res.data.success) {
            setRegisterSuccess(false);
            setEmailErr('User already existed, please check email');
          } else {
            setRegisterSuccess(true);
          }
        })
        .catch((err) => {
          setRegisterSuccess(false);
          console.log('err:', err);
        });
    }
  };

  const isValidEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className='signUpContainer'>
      <div className='signUpImageContainer'>
        <img className='signUpImage' src='/images/signUpImage.jpg' alt='signup image' />
      </div>
      <div className='signUpBody'>
        {!registerSuccess ? (
          <>
            <div className='signUpTitle'>
              Create a free account to discover your personalized learning path
            </div>

            <form className='signUpForm' onSubmit={(e) => handleUserSignUp(e)}>
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
                Sign Up
              </button>
              <small className='helpText'>
                By clicking above, I agree to the website's Terms and Privacy Policy
              </small>
            </form>
          </>
        ) : (
          <div className='successfulContainer'>
            <div className='signUpTitle'>
              <div>Successfully registered!</div>
              <div> Please click the login button below</div>
            </div>
          </div>
        )}

        <div className='signUpActionContainer'>
          <div>Existing user?</div>
          <div
            className='loginAction'
            onClick={() => {
              navigate('/login');
            }}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
