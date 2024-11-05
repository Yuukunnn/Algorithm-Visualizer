import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../NavBar/NavBarMain';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import './MockInterview.css';
import SkillsLevelForm from './SkillsLevelForm';
import Calendar from './Calendar';
import ConfirmationPage from './ConfirmationPage';

const MockInterview = () => {
  const { userData, authToken } = useContext(UserContext);
  const [nextAllowed, setNextAllowed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [targetRole, setTargetRole] = useState('');
  const [algoLevel, setAlgoLevel] = useState('');
  const [notes, setNotes] = useState('');
  const [availableTimeslots, setAvailableTimeslots] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMsg, setDialogMsg] = useState('');

  // variables for calendar
  const [selectedOption, setSelectedOption] = useState(''); //existing, new
  const [selectedTimeslotId, setSelectedTimeslotId] = useState(0);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [timeOne, setTimeOne] = useState('');

  const navigate = useNavigate();
  const ApiBaseURL = 'http://localhost:6688/api/interview';
  const steps = ['Fill out your skills level', 'Select timeslots', 'Submit your interview request'];

  useEffect(() => {
    let allowed = false;
    if (activeStep === 0) {
      allowed = targetRole && algoLevel;
    }

    if (activeStep === 2) {
      allowed = true;
    }

    setNextAllowed(allowed);
  }, [activeStep, targetRole, algoLevel]);

  const handleNext = () => {
    if (activeStep === 0) {
      // when entering step 2, getMatchedLevelTimeSlots
      axios
        .post(`${ApiBaseURL}/getMatchedLevelTimeSlots`, {
          algoLevel: algoLevel,
          authToken: authToken,
        })
        .then((res) => {
          setAvailableTimeslots(res.data.timeSlots);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((err) => console.error(err));
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2) {
      // on finish, submit new interview request
      if (selectedOption === 'new') {
        axios
          .post(`${ApiBaseURL}/submitInterview`, {
            userid: userData.id,
            interviewObj: {
              user_id: userData.id,
              algo_level: algoLevel,
              target_role: targetRole,
              notes: notes,
            },
            timeSlots: [timeOne.format('YYYY-MM-DD HH:mm:ss')],
            authToken: authToken,
          })
          .then((res) => {
            setOpenDialog(true);
            setDialogTitle('Success!');
            setDialogMsg(
              'Successfully submitted new interview request, we will get you paired ASAP and please expect an email for confirmation.'
            );
          })
          .catch((err) => {
            setOpenDialog(true);
            setDialogTitle('Error');
            setDialogMsg(err);
          });
      }

      if (selectedOption === 'existing') {
        axios
          .post(`${ApiBaseURL}/matchWithExisitng`, {
            userid: userData.id,
            interviewObj: {
              user_id: userData.id,
              algo_level: algoLevel,
              target_role: targetRole,
              notes: notes,
            },
            selectedTimestampID: selectedTimeslotId,
            authToken: authToken,
          })
          .then((res) => {
            setOpenDialog(true);
            setDialogTitle('Success!');
            setDialogMsg(
              'Successfully matched with exisitng interview request. Have fun Mocking!!'
            );
          })
          .catch((err) => {
            setOpenDialog(true);
            setDialogTitle('Error');
            setDialogMsg(err);
          });
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <NavBar />

      <Box className='stepContainer'>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && (
              <SkillsLevelForm
                targetRole={targetRole}
                setTargetRole={setTargetRole}
                algoLevel={algoLevel}
                setAlgoLevel={setAlgoLevel}
                notes={notes}
                setNotes={setNotes}
              />
            )}
            {activeStep === 1 && (
              <Calendar
                availableTimeslots={availableTimeslots}
                setNextAllowed={setNextAllowed}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectedTimeslotId={selectedTimeslotId}
                setSelectedTimeslotId={setSelectedTimeslotId}
                setSelectedTimeslot={setSelectedTimeslot}
                timeOne={timeOne}
                setTimeOne={setTimeOne}
              />
            )}
            {activeStep === 2 && (
              <ConfirmationPage
                targetRole={targetRole}
                algoLevel={algoLevel}
                notes={notes}
                selectedOption={selectedOption}
                selectedTimeslot={selectedTimeslot}
                timeOne={timeOne}
              />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color='inherit'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  mr: 1,
                  '&.Mui-disabled': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button
                disabled={!nextAllowed}
                onClick={handleNext}
                sx={{
                  '&.Mui-disabled': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* ===== confirmation dialog ===== */}
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {dialogMsg}
              <br />
              <br />
              Click OK to navigate back to home page.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
                navigate('/');
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MockInterview;
