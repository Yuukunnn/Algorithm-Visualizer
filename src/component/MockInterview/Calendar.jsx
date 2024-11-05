import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { TextField, Grid, Button } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const Calendar = ({
  availableTimeslots,
  setNextAllowed,
  selectedOption,
  setSelectedOption,
  selectedTimeslotId,
  setSelectedTimeslotId,
  setSelectedTimeslot,
  timeOne,
  setTimeOne,
}) => {
  const [showExistingTimeslots, setShowExisitingTimeslots] = useState(true);
  const [showDatetimePicker, setShowDatetimePicker] = useState(timeOne ? true : false);

  useEffect(() => {
    if (
      (selectedOption === 'existing' && selectedTimeslotId !== 0) ||
      (selectedOption === 'new' && timeOne !== '')
    ) {
      setNextAllowed(true);
    } else {
      setNextAllowed(false);
    }
  }, [selectedOption, selectedTimeslotId, timeOne]);

  return (
    <div className='calendarContainer'>
      {availableTimeslots.length > 0 && (
        <div className='matchNowContainer'>
          <Button
            sx={{ textAlign: 'center', margin: '20px auto' }}
            onClick={() => {
              setShowExisitingTimeslots(true);
              setShowDatetimePicker(false);
            }}
          >
            Select from Existing Spots for Quick Pairing
          </Button>

          {showExistingTimeslots && (
            <div className='timeslotContainer'>
              {availableTimeslots.map((timeslot, idx) => (
                <div
                  key={idx}
                  className={`timeslot ${
                    timeslot.timeslot_id === selectedTimeslotId ? 'selected' : ''
                  }`}
                  onClick={() => {
                    setSelectedOption('existing');
                    setSelectedTimeslotId(timeslot.timeslot_id);
                    setSelectedTimeslot(dayjs(timeslot.time).format('MM/DD/YYYY HH:mm'));
                    setTimeOne('');
                    setShowDatetimePicker(false);
                  }}
                >
                  <span style={{ marginRight: '10px' }}>{timeslot.algo_level}</span>
                  <span>{dayjs(timeslot.time).format('MM/DD/YYYY HH:mm')}</span>
                  <br />
                  <span>{timeslot.target_role}</span>
                  <br />
                  <span>{timeslot.notes}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Grid container flexDirection='column' className='enterNewAvails'>
        <Grid item sx={{ textAlign: 'center', margin: '20px auto' }}>
          <Button
            onClick={() => {
              setSelectedOption('new');
              setSelectedTimeslotId(0);
              setShowDatetimePicker(true);
              setShowExisitingTimeslots(false);
            }}
          >
            Submit Your Desired Time
          </Button>
        </Grid>

        {showDatetimePicker && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label='Preferred time'
              value={timeOne}
              onChange={(newValue) => {
                setTimeOne(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '.MuiInputBase-root': {
                      marginBottom: '20px',
                      minWidth: '600px',
                    },
                    margin: 'auto',
                  }}
                />
              )}
            />
          </LocalizationProvider>
        )}
      </Grid>
    </div>
  );
};

export default Calendar;
