import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import PasswordField from './PasswordField';
import NavBar from '../NavBar/NavBarMain';
import './css/resetpassword.css';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [savePasswordSuccess, setSavePasswordSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const ApiBaseURL = 'http://localhost:6688/api/user';

  useEffect(() => {
    // check if token exists in URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    //clear up error message and success status when input changes
    setEmailErr('');
    setPasswordErr('');
    setResetSuccess(false);
    setSavePasswordSuccess(false);
  }, [email, password]);

  useEffect(() => {
    if (savePasswordSuccess) {
      navigate('/login');
    }
  }, [savePasswordSuccess]);

  const handleSendResetLink = (e) => {
    e.preventDefault();

    if (!isValidEmail()) {
      setEmailErr('Invalid Email Input');
      return;
    }

    if (isValidEmail()) {
      axios
        .post(`${ApiBaseURL}/sendResetLink`, {
          email: email,
        })
        .then((res) => {
          if (res.data.success) {
            setResetSuccess(true);
          } else {
            setResetSuccess(false);
            setEmailErr('User already existed, please check email');
          }
        })
        .catch((err) => {
          setResetSuccess(false);
          console.log('err:', err);
        });
    }
  };

  const handleSaveNewPassword = (e) => {
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
        .put(`${ApiBaseURL}/resetPassword`, {
          email: email,
          newPassword: password,
          resetToken: token,
        })
        .then((res) => {
          if (!res.data.success) {
            setSavePasswordSuccess(false);
            setEmailErr('User not found please verify and try again!');
          } else {
            setSavePasswordSuccess(true);
          }
        })
        .catch((err) => {
          setSavePasswordSuccess(false);
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
    <div>
      <NavBar />

      <div className='resetContainer'>
        {!resetSuccess ? (
          <div className='resetBody'>
            <div className='resetTitle'>Forgot your password?</div>

            {token === '' ? (
              <form className='resetForm' onSubmit={(e) => handleSendResetLink(e)}>
                <div className='inputGroup'>
                  <input
                    className='textField'
                    placeholder='Email address'
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailErr.length > 0 && <small className='helpText error'>{emailErr}</small>}
                </div>

                <button className='loginButton' type='submit'>
                  Send Reset Link
                </button>
              </form>
            ) : (
              <form className='resetForm' onSubmit={(e) => handleSaveNewPassword(e)}>
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
                  Save New Password
                </button>
              </form>
            )}

            <div className='resetContactContainer'>
              <small className='helpText'>
                If you have any questions while resetting your password, feel free to contact us at
                support@algovisual.org
              </small>
            </div>
          </div>
        ) : (
          <div className='resetBody'>
            <div className='resetTitle'>
              Reset password requested successfully! Please check your email and follow the reset
              instructions!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
