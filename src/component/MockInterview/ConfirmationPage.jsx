import { useState } from 'react';
import dayjs from 'dayjs';
import { TextField, Grid, Button } from '@mui/material';

const ConfirmationPage = ({
  targetRole,
  algoLevel,
  notes,
  selectedOption,
  selectedTimeslot,
  timeOne,
}) => {
  return (
    <>
      <div className='InterviewIntroduction'>Confirm below before submitting interview request</div>
      <div className='confirmationContainer'>
        <Grid container margin='auto' alignItems='center' justifyContent='center'>
          <Grid item xs={6} textAlign='end' paddingRight='50px'>
            Target Role:
          </Grid>
          <Grid item xs={6}>
            {targetRole}
          </Grid>
        </Grid>

        <Grid container margin='auto' alignItems='center' justifyContent='center'>
          <Grid item xs={6} textAlign='end' paddingRight='50px'>
            Algorithm Level:
          </Grid>
          <Grid item xs={6}>
            {algoLevel}
          </Grid>
        </Grid>

        <Grid container margin='auto' alignItems='center' justifyContent='center'>
          <Grid item xs={6} textAlign='end' paddingRight='50px'>
            Notes:
          </Grid>
          <Grid item xs={6}>
            {notes}
          </Grid>
        </Grid>
        <br />

        <Grid container margin='auto' alignItems='center' justifyContent='center'>
          <Grid item xs={6} textAlign='end' paddingRight='50px'>
            Selected Option:
          </Grid>
          <Grid item xs={6}>
            {selectedOption === 'existing'
              ? 'Pair with existing interviewer'
              : 'Submit new timeslot (pending pairing)'}
          </Grid>
        </Grid>

        <Grid container margin='auto' alignItems='center' justifyContent='center'>
          <Grid item xs={6} textAlign='end' paddingRight='50px'>
            {selectedOption === 'existing' ? <div>Confirm Time: </div> : <div>Selected Time:</div>}
          </Grid>
          <Grid item xs={6}>
            {selectedOption === 'existing' ? (
              <div>{selectedTimeslot}</div>
            ) : (
              <div>{dayjs(timeOne).format('MM/DD/YYYY HH:mm')}</div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ConfirmationPage;
