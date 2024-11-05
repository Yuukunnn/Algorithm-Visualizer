import pg from 'pg';
import dotenv from 'dotenv';
import chalk from 'chalk';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/Capstone');

const jwtSignature = 'superSecret';

dotenv.config();

const createTables = async () => {
  try {
    await client.connect();
    //TODO: remove seeded data after development

    const SQL = `
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          DROP TABLE IF EXISTS interview_timeslot;
          DROP TABLE IF EXISTS interview_master;
          DROP TABLE IF EXISTS Users;
      
          CREATE TABLE Users(
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              email VARCHAR(255) NOT NULL,
              password VARCHAR(255) NOT NULL,
              isAdmin Boolean DEFAULT FALSE,
              FirstName VARCHAR(50) DEFAULT '',
              LastName VARCHAR(50) DEFAULT '',
              Address VARCHAR(255) DEFAULT '',
              AddressLine2 VARCHAR(50) DEFAULT '',
              City VARCHAR(50) DEFAULT '',
              State VARCHAR(2) DEFAULT '',
              Zipcode VARCHAR(5) DEFAULT '',
              CurrentSchool VARCHAR(100) DEFAULT ''
          );

          CREATE TABLE interview_master(
            interview_id SERIAL PRIMARY KEY,
            user_id UUID,
            status VARCHAR(20) NOT NULL,
            algo_level VARCHAR(20) NOT NULL,
            target_role VARCHAR(50) NOT NULL,
            notes VARCHAR(255) DEFAULT '',
            FOREIGN KEY (user_id) REFERENCES Users(id)
          );

          CREATE TABLE interview_timeslot(
            timeslot_id SERIAL PRIMARY KEY,
            interview_id INT,
            time TIMESTAMP,
            status VARCHAR(20),
            FOREIGN KEY(interview_id) REFERENCES interview_master(interview_id)
          );

          INSERT INTO Users (email, password)
          VALUES ('yukun@gmail.com', '$2b$10$angtjWdzK5xQ2Cl1CV5mGOikLmtSaZGwjlygSlRyapuwYMKZSPcNu');

          `;

    await client.query(SQL);
    console.log(chalk.green('DB created successfully!!'));
  } catch (err) {
    console.log(chalk.red('Failed to create DB?!', err));
  }
};

const register = async (email, password) => {
  const isEmailValidSQL = `SELECT * FROM Users WHERE email = $1;`;

  let validNewUser = false;

  try {
    const response = await client.query(isEmailValidSQL, [email]);
    if (response.rows.length > 0) {
      return {
        success: false,
        err: 'user already existed',
      };
    } else {
      validNewUser = true;
    }
  } catch (err) {
    throw err;
  }

  if (validNewUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `
    INSERT INTO Users(email, password)
    VALUES($1,$2)
    RETURNING *;
    `;
    try {
      const response = await client.query(SQL, [email, hashedPassword]);
      return {
        success: true,
        rows: response.rows,
      };
    } catch (err) {
      console.log(chalk.red('failed to register!'));
      throw err;
    }
  }
};

const logIn = async (email, password) => {
  const SQL = `
    SELECT * FROM Users WHERE Email = $1
  `;

  try {
    const result = await client.query(SQL, [email]);
    const user = result.rows[0];
    if (!user) {
      return {
        success: false,
        err: 'User not found sign up now!',
      };
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.name,
        },
        jwtSignature,
        { expiresIn: '1d' }
      );

      return {
        success: true,
        authToken: token,
        userData: result.rows[0],
        msg: 'successfully logged in',
      };
    } else {
      return { msg: 'Invalid email or password' };
    }
  } catch (err) {
    throw err;
  }
};
const resetPassword = async (email, newPassword, resetToken) => {
  const SQL = `SELECT * FROM Users WHERE email = $1`;
  const isRegistered = await client.query(SQL, [email]);

  const isValidToken = jwt.verify(resetToken, jwtSignature);

  if (isRegistered.rows.length !== 0 && isValidToken) {
    try {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const SQL = `
      UPDATE Users SET password = $1 WHERE email = $2
      RETURNING *
      `;
      const result = await client.query(SQL, [hashedNewPassword, email]);
      return {
        success: true,
        msg: 'reset password successfully!',
      };
    } catch (err) {
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Failed to reset password, please try again or request a new link!',
    };
  }
};

const sendResetPasswordLink = async (email) => {
  const SQL = `SELECT * FROM Users WHERE email = $1`;
  const isRegistered = await client.query(SQL, [email]);
  if (isRegistered.rows.length !== 0) {
    const resetToken = jwt.sign(
      {
        email: email,
      },
      jwtSignature,
      { expiresIn: '10m' }
    );
    return {
      success: true,
      resetToken: resetToken,
      msg: 'user found',
    };
  } else {
    return {
      success: false,
      msg: 'user not found',
    };
  }
};

const changePassword = async (userid, currentPassword, newPassword, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);

  if (isValidToken) {
    try {
      // Retrieve the stored hashed password
      const getCurrentPasswordSQL = `SELECT password FROM Users WHERE id = $1`;
      const currPasswordResult = await client.query(getCurrentPasswordSQL, [userid]);

      if (currPasswordResult.rows.length === 0) {
        return {
          success: false,
          msg: 'User not found',
        };
      }

      const storedHashedPassword = currPasswordResult.rows[0].password;

      // Compare the provided current password with the stored hashed password
      const isMatch = await bcrypt.compare(currentPassword, storedHashedPassword);

      if (!isMatch) {
        return {
          success: false,
          msg: 'Incorrect current password',
        };
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const SQL = `
      UPDATE Users 
      SET password = $2
      WHERE id = $1;
      `;
      const result = await client.query(SQL, [userid, hashedNewPassword]);
      return {
        success: true,
        msg: 'Successfully updated password!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

const updatePersonalInfo = async (userid, newInfoObj, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);

  if (isValidToken) {
    try {
      const SQL = `
      UPDATE Users 
      SET FirstName = $2, LastName = $3, Address = $4, AddressLine2 = $5,
          City = $6, State = $7, Zipcode = $8, CurrentSchool = $9
      WHERE id = $1
      RETURNING *
      `;
      const result = await client.query(SQL, [
        userid,
        newInfoObj.firstName,
        newInfoObj.lastName,
        newInfoObj.address,
        newInfoObj.addressLine2,
        newInfoObj.city,
        newInfoObj.state,
        newInfoObj.zipCode,
        newInfoObj.school,
      ]);
      return {
        success: true,
        updatedUserData: result.rows[0],
        msg: 'Successfully updated personal info!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

const submitInterviewRequest = async (userid, interviewObj, timeSlots, authToken) => {
  // interview and timestamp status are paried or open
  const isValidToken = jwt.verify(authToken, jwtSignature);

  if (isValidToken) {
    try {
      const SQL1 = `
      INSERT INTO interview_master (user_id, status, algo_level, target_role, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;
      const result1 = await client.query(SQL1, [
        userid,
        'O',
        interviewObj.algo_level,
        interviewObj.target_role,
        interviewObj.notes,
      ]);

      const interviewID = result1.rows[0].interview_id;

      timeSlots.forEach(async (time) => {
        const SQL2 = `
          INSERT INTO interview_timeslot (interview_id, time, status)
          VALUES ($1, $2, $3)
        `;

        const result2 = await client.query(SQL2, [interviewID, time, 'O']);
      });

      return {
        success: true,
        submittedInterview: result1.rows[0],
        msg: 'Successfully submitted interview request!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};
const matchExistingInterview = async (userid, interviewObj, selectedTimestampID, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);

  // interviewObj = {
  //   user_id: 1,
  //   algo_level: 'Beginner',
  //   target_role: 'Software Engineer',
  //   notes: 'please be nice to me'
  // }

  // timeSlots = ['2024-08-17 17:07:27', '2024-08-17 17:07:27']

  if (isValidToken) {
    try {
      const SQL1 = `
      INSERT INTO interview_master (user_id, status, algo_level, target_role, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `;
      const result1 = await client.query(SQL1, [
        userid,
        'P',
        interviewObj.algo_level,
        interviewObj.target_role,
        interviewObj.notes,
      ]);

      // set matched interview status and timestamp status both to P-Paired
      const SQL2 = `UPDATE interview_timeslot 
                    SET status = 'P'
                    WHERE timeslot_id = $1 returning *`;
      const result2 = await client.query(SQL2, [selectedTimestampID]);
      const matchedInterviewID = result2.rows[0].interview_id;

      const SQL3 = `UPDATE interview_master
                    SET status = 'P'
                    WHERE interview_id = $1`;
      const result3 = await client.query(SQL3, [matchedInterviewID]);

      return {
        success: true,
        macthedInterview: {
          incomingRequest: result1.rows[0],
          existingInterview: result3.rows[0],
        },
        msg: 'Successfully submitted interview request!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

const fetchMatchedLevelTimeSlots = async (algoLevel, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);
  if (isValidToken) {
    try {
      const SQL = `
      SELECT t.timeslot_id, firstname, lastname, algo_level, target_role, notes, time
      FROM interview_master m
      JOIN interview_timeslot t ON m.interview_id = t.interview_id
      JOIN Users u ON u.id = m.user_id
      WHERE algo_level = $1 AND t.status = 'O';
    `;

      const result = await client.query(SQL, [algoLevel]);
      return {
        success: true,
        timeSlots: result.rows,
        msg: 'Successfully fetched interview request!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

const fetchInterviewsForUser = async (userid, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);
  if (isValidToken) {
    try {
      const SQL = `
      SELECT m.interview_id, m.status, algo_level, target_role, time
      FROM interview_master m
      JOIN interview_timeslot t ON m.interview_id = t.interview_id
      WHERE user_id = $1;
    `;

      const result = await client.query(SQL, [userid]);
      return {
        success: true,
        interviews: result.rows,
        msg: 'Successfully fetched interviews for user!',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

const deleteInterviewByID = async (interviewID, authToken) => {
  const isValidToken = jwt.verify(authToken, jwtSignature);
  if (isValidToken) {
    try {
      const SQL1 = 'DELETE FROM interview_timeslot WHERE interview_id = $1;';
      const SQL2 = 'DELETE FROM interview_master WHERE interview_id = $1;';

      await client.query(SQL1, [interviewID]);
      await client.query(SQL2, [interviewID]);

      return {
        success: true,
        msg: 'Successfully deleted selected interview.',
      };
    } catch (err) {
      console.error('SQL update error: ', err);
      throw err;
    }
  } else {
    return {
      success: false,
      msg: 'Auth Token expired',
    };
  }
};

export {
  client,
  createTables,
  register,
  logIn,
  resetPassword,
  sendResetPasswordLink,
  changePassword,
  updatePersonalInfo,
  submitInterviewRequest,
  fetchMatchedLevelTimeSlots,
  matchExistingInterview,
  fetchInterviewsForUser,
  deleteInterviewByID,
};
