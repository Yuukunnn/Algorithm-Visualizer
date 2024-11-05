import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import AlertModal from '../modals/AlertModal';
import PasswordField from './PasswordField';
import './css/updateInfo.css';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errMsg_new, setErrMsg_new] = useState('');
  const [errMsg_current, setErrMsg_current] = useState('');
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  });

  const { userData, authToken } = useContext(UserContext);

  const ApiBaseURL = 'http://localhost:6688/api/user';

  useEffect(() => {
    setErrMsg_current('');
    setErrMsg_new('');
  }, [currentPassword, newPassword, confirmNewPassword]);

  const handleChangePassword = (e) => {
    e.preventDefault();

    const passwordMatches = newPassword === confirmNewPassword;
    const isValidNewPassword = isValidPassword(newPassword);

    if (!passwordMatches) {
      setErrMsg_new('Please enter the correct new password in both fields');
      return;
    }

    if (!isValidNewPassword) {
      setErrMsg_new(
        'Password must be at least 8 characters inlcuding uppercase, lowercase, number and special character'
      );
      return;
    }

    axios
      .put(`${ApiBaseURL}/changePassword`, {
        userid: userData.id,
        currentPassword: currentPassword,
        newPassword: newPassword,
        authToken: authToken,
      })
      .then((res) => {
        if (res.data.success) {
          setOpenAlertModal(true);
          setAlertTitle('Success!');
          setAlertMsg('Password has been successfully updated!');
        } else {
          setErrMsg_current(res.data.msg);
        }
      })
      .catch(() => {
        setOpenAlertModal(true);
        setAlertTitle('Update Failed');
        setAlertMsg('Login expired or current password is incorrect, please try again');
      });
  };

  const isValidPassword = (inputPassword) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(inputPassword);
  };

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { margin: '5% 5% 5% 0', backgroundColor: '#ffffff' },
        }}
        noValidate
      >
        <h2>Update Password</h2>

        <div className='inputRow password'>
          <PasswordField
            label='Current Password'
            value={currentPassword || ''}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={errMsg_current}
          />
        </div>

        <div className='inputRow password'>
          <PasswordField
            label='New Password'
            value={newPassword || ''}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errMsg_new}
          />
        </div>

        <div className='inputRow password'>
          <PasswordField
            label='Confirm New Password'
            value={confirmNewPassword || ''}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div className='submitContainer' onClick={(e) => handleChangePassword(e)}>
          <button className='loginButton halfWidth'>Change Password</button>
        </div>
      </Box>

      {/* =========== alert modal ============ */}
      {openAlertModal && (
        <AlertModal
          title={alertTitle}
          message={alertMsg}
          onConfirm={() => onConfirm()}
          open={openAlertModal}
          setOpen={setOpenAlertModal}
        />
      )}
    </>
  );
};

export default UpdatePassword;
