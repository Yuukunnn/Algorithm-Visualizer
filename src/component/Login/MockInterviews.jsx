import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmModal from '../modals/ConfirmModal';

const MockInterviews = () => {
  const { userData, authToken } = useContext(UserContext);
  const [interviews, setInterviews] = useState([]);
  const [selectedID, setSelectedID] = useState(0);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const navigate = useNavigate();
  const ApiBaseURL = 'http://localhost:6688/api/interview';

  useEffect(() => {
    // fetch interviews for user
    axios
      .post(`${ApiBaseURL}/getInterviewsByUserId`, {
        userid: userData.id,
        authToken: authToken,
      })
      .then((res) => {
        setInterviews(res.data.interviews);
      })
      .catch((err) => console.log(err));
  }, [selectedID]);

  const cancelInterview = () => {
    axios
      .post(`${ApiBaseURL}/deleteInterviewByID`, {
        interviewID: selectedID,
        authToken: authToken,
      })
      .then((res) => {
        setSelectedID(0);
      })
      .catch((err) => console.log(err));
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
        <h2>Upcoming Interviews</h2>

        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {interviews.map((item) => (
              <Item key={item.interview_id}>
                <Grid container>
                  <Grid container flexDirection='column' item xs={11}>
                    <div>
                      <b>{dayjs(item.time).format('MM/DD/YYYY HH:mm')}</b>
                    </div>
                    <div>{item.algo_level}</div>
                    <div>{item.target_role}</div>
                    <div>Status: {item.status === 'O' ? 'Pending' : 'Confirmed'}</div>
                  </Grid>

                  <Grid alignContent='center' xs={1}>
                    <DeleteOutlineIcon
                      sx={{ fontSize: '20px', cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedID(item.interview_id);
                        setOpenConfirmModal(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </Item>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* =========== alert modal ============ */}
      {openConfirmModal && (
        <ConfirmModal
          title='Confirm Delete'
          message='Are you sure you want to cancel this interview?'
          onConfirm={() => cancelInterview()}
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
        />
      )}
    </>
  );
};

const Item = styled('div')(({ theme }) => ({
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
  minHeight: '50px',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: '10px',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default MockInterviews;
