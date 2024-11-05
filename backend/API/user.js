import express from 'express';
import nodemailer from 'nodemailer';
import {
  register,
  logIn,
  resetPassword,
  sendResetPasswordLink,
  changePassword,
  updatePersonalInfo,
} from '../db.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    const newUser = await register(req.body.email, req.body.password);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const result = await logIn(req.body.email, req.body.password);
    if (result.error) {
      res.status(401).send(result.error);
    } else {
      res.status(201).send(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post('/sendResetLink', async (req, res) => {
  try {
    const result = await sendResetPasswordLink(req.body.email);
    if (!result.success) {
      return res.status(404).send({ msg: 'email not registered' });
    } else {
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
        }
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        // Create a transporter object
        //   const transporter = nodemailer.createTransport({
        //     service: 'Gmail',
        //     auth: {
        //       user: 'accdycapstone@gmail.com',
        //       pass: 'accdy123!',
        //     },
        //   });

        // Email options
        const mailOptions = {
          //TODO: replace link in text with prod link after deployed!
          from: 'dummy@example.com',
          to: req.body.email,
          subject: 'Reset Password Request',
          text: `Hi! Please use the link to reset password. Please note it will expire in 10 minutes! http://localhost:3000/resetpassword?token=${result.resetToken}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error occurred: ', error);
            return res.status(500).send({ success: false, msg: 'Failed to send reset link' });
          }
          console.log('Email sent: ' + info.response);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          res.status(201).send({ success: true, msg: 'Reset link sent successfully' });
        });
      });
    }
  } catch (err) {
    console.log('failed to send reset password email!');
    res.status(500).send(err);
  }
});

userRouter.put('/resetPassword', async (req, res) => {
  try {
    const result = await resetPassword(req.body.email, req.body.newPassword, req.body.resetToken);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.put('/changePassword', async (req, res) => {
  try {
    const result = await changePassword(
      req.body.userid,
      req.body.currentPassword,
      req.body.newPassword,
      req.body.authToken
    );
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.put('/updatePersonalInfo', async (req, res) => {
  try {
    const result = await updatePersonalInfo(
      req.body.userid,
      req.body.newInfoObj,
      req.body.authToken
    );
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { userRouter };
