import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AlertModal from '../modals/AlertModal';
import axios from 'axios';
import './css/updateInfo.css';

const UpdatePersonalInfo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [school, setSchool] = useState('');
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const { userData, setUserData, authToken, setAuthToken } = useContext(UserContext);
  const navigate = useNavigate();
  const ApiBaseURL = 'http://localhost:6688/api/user';

  useEffect(() => {
    // prefill fields with current user data
    if (Object.keys(userData).length > 0) {
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setAddress(userData.address);
      setAddressLine2(userData.addressline2);
      setCity(userData.city);
      setState(userData.state);
      setZipCode(userData.zipcode);
      setSchool(userData.currentschool);
    }
  }, [userData]);

  const handleUpdatePersonalInfo = (e) => {
    e.preventDefault();

    const newInfoObj = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      addressLine2: addressLine2,
      city: city,
      state: state,
      zipCode: zipCode,
      school: school,
    };

    axios
      .put(`${ApiBaseURL}/updatePersonalInfo`, {
        userid: userData.id,
        newInfoObj: newInfoObj,
        authToken: authToken,
      })
      .then((res) => {
        if (res.data.success) {
          setUserData(res.data.updatedUserData);

          setOpenAlertModal(true);
          setAlertTitle('Success!');
          setAlertMsg('Personal info has been successfully updated!');
          setOnConfirm(() => () => {});
        }
      })
      .catch((err) => {
        setOpenAlertModal(true);
        setAlertTitle('Update Failed');
        setAlertMsg('Login expired, please try again');
        setAuthToken('');
        setOnConfirm(() => () => {
          navigate('/login');
        });
      });
  };

  return (
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 3, width: '40%', backgroundColor: '#ffffff' },
        }}
        noValidate
      >
        <h2>Update Personal Info</h2>
        <div className='inputRow'>
          <TextField
            required
            label='First Name'
            value={firstName || ''}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            label='Last Name'
            value={lastName || ''}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className='inputRow'>
          <TextField
            label='Address'
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label='Address Line 2'
            value={addressLine2 || ''}
            onChange={(e) => setAddressLine2(e.target.value)}
          />
        </div>

        <div className='inputRow'>
          <TextField label='City' value={city || ''} onChange={(e) => setCity(e.target.value)} />

          <FormControl variant='outlined' sx={{ m: 3, width: '40%' }}>
            <InputLabel id='state-select-label'>State</InputLabel>
            <Select
              labelId='state-select-label'
              id='state-select'
              label='State'
              sx={{ backgroundColor: '#ffffff' }}
              value={state || ''}
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value=''></MenuItem>
              {stateList.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='inputRow'>
          <TextField
            label='Zipcode'
            value={zipCode || ''}
            onChange={(e) => {
              const newVal = e.target.value;
              if (newVal.length <= 5 && !isNaN(Number(newVal))) {
                setZipCode(e.target.value);
              }
            }}
          />
          <TextField
            label='Name of your current school'
            value={school || ''}
            onChange={(e) => setSchool(e.target.value)}
          />
        </div>

        <div className='submitContainer' onClick={(e) => handleUpdatePersonalInfo(e)}>
          <button className='loginButton halfWidth'>Update Personsal Info</button>
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

const stateList = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export default UpdatePersonalInfo;
