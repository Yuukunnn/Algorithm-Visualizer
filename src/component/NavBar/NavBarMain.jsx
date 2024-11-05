import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, setAuthToken } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const navigateHome = () => {
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickingAccount = () => {
    navigate('/account');
  };

  const handleClickingLogOut = () => {
    setIsLoggedIn(false);
    setAuthToken('');
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className='header'>
      <div >
        <h1 onClick={navigateHome} className='title'>
          Algorithm Visualizer
        </h1>
      </div>
      {isLoggedIn ? (
        <div className='userAvatar'>
          <button className='startMockInterviewBtn' onClick={() => navigate('/mockinterview')}>
            Schedule Mock Interview
          </button>
          <Avatar onClick={handleClick} />

          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              paper: {
                style: {
                  transform: 'translate(-1.5vw, 10px)',
                },
              },
            }}
          >
            {/* <MenuItem onClick={handleClose}>Help</MenuItem> */}
            <MenuItem onClick={handleClickingAccount}>Account</MenuItem>
            <MenuItem onClick={handleClickingLogOut}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <>
          {/* <button className='quiz-btn' onClick={() => navigate('/quiz')}>
            Quiz
          </button> */}
          <button className='login-btn' onClick={() => navigate('/login')}>
            Log in
          </button>
        </>
      )}
    </header>
  );
};

export default NavBar;
