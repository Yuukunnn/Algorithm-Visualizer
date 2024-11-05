import { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';

const SkillsLevelForm = ({
  targetRole,
  setTargetRole,
  algoLevel,
  setAlgoLevel,
  notes,
  setNotes,
}) => {
  const algoLevelOptions = ['Beginner', 'Intermediate', 'Advance'];
  const targetRoleOptions = [
    'Software Engineer',
    'Project Manager',
    'Data Scientist',
    'Data Analyst',
    'IOS Developer',
    'UI/UX',
  ];

  return (
    <div>
      <div className='InterviewIntroduction'>
        Schedule a 1-on-1 session with a candidate at your algorithm level.
      </div>

      <div className='MockInterviewContainer'>
        <TextField
          fullWidth
          select
          variant='outlined'
          label='Target Role'
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          sx={{ marginBottom: '35px' }}
        >
          {targetRoleOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          variant='outlined'
          label='Algorithm Level'
          value={algoLevel}
          onChange={(e) => setAlgoLevel(e.target.value)}
          sx={{ marginBottom: '35px' }}
        >
          {algoLevelOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          multiline
          variant='outlined'
          label='Notes for Your Pair'
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SkillsLevelForm;
