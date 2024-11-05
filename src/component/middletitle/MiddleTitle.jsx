import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// Define styles for the container using sx prop
const MdContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '30vh 10vh 30vh',
  [theme.breakpoints.down('sm')]: {
    margin: '1rem 0',
    width: '90%',
    display: 'flex',
  },
}));

// Define styles for the title
const MiddleTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  color: '#333',
  fontFamily: '"Teko", sans-serif',
  fontWeight: 300,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.3rem',
  },
}));

const MiddleTitleComponent = () => {
  return (
    <MdContainer>
      <MiddleTitle variant="h1" align="center">
      Sorting algorithms are fundamental to computer science and data manipulation
      </MiddleTitle>
    </MdContainer>
  );
};

export default MiddleTitleComponent;