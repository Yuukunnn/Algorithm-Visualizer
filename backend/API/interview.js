import express from 'express';

import {
  submitInterviewRequest,
  fetchMatchedLevelTimeSlots,
  matchExistingInterview,
  fetchInterviewsForUser,
  deleteInterviewByID,
} from '../db.js';

const interviewRouter = express.Router();

interviewRouter.post('/submitInterview', async (req, res) => {
  try {
    const newInterview = await submitInterviewRequest(
      req.body.userid,
      req.body.interviewObj,
      req.body.timeSlots,
      req.body.authToken
    );
    res.status(201).send(newInterview);
  } catch (err) {
    console.log('in error');
    res.status(500).send(err);
  }
});

interviewRouter.post('/matchWithExisitng', async (req, res) => {
  try {
    const confirmedInterview = await matchExistingInterview(
      req.body.userid,
      req.body.interviewObj,
      req.body.selectedTimestampID,
      req.body.authToken
    );
    res.status(201).send(confirmedInterview);
  } catch (err) {
    console.log('in error');
    res.status(500).send(err);
  }
});

interviewRouter.post('/getMatchedLevelTimeSlots', async (req, res) => {
  try {
    const timeSlots = await fetchMatchedLevelTimeSlots(req.body.algoLevel, req.body.authToken);
    res.status(200).send(timeSlots);
  } catch (err) {
    res.status(500).send(err);
  }
});

interviewRouter.post('/getInterviewsByUserId', async (req, res) => {
  try {
    const interviews = await fetchInterviewsForUser(req.body.userid, req.body.authToken);
    res.status(200).send(interviews);
  } catch (err) {
    res.status(500).send(err);
  }
});

interviewRouter.post('/deleteInterviewByID', async (req, res) => {
  try {
    const result = await deleteInterviewByID(req.body.interviewID, req.body.authToken);
    res.status(204).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { interviewRouter };
