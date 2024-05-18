const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user: UserModel } = require('../models/UserModel');

const login = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      userName: joi.string().required().min(5),
      password: joi.string().required().min(5),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: 'fail',
        message: validationError.details[0].message,
      });
    }
    // End ValidationInput

    // Chec username already exist
    const userByUsername = await UserModel.findOne({
      userName: dataInput.userName,
    });
    if (!userByUsername) {
      return res.status(400).send({
        status: 'fail',
        message: `User by User Name: ${dataInput.userName} Not Found`,
      });
    }
    // End Check username already exist

    // Compare password
    const comparePsw = await bcrypt.compare(
      dataInput.password,
      userByUsername.password
    );
    if (!comparePsw) {
      return res.status(400).send({
        status: 'fail',
        message: `Wrong password!`,
      });
    }
    // End Compare password

    // Make token
    const token = jwt.sign(
      {
        id: userByUsername.id,
        email: userByUsername.emailAddress,
        username: userByUsername.userName,
      },
      process.env.ACCESS_SECRET_KEY
    );
    // End Make token

    return res.send({
      status: 'success',
      message: `Login Success`,
      user: {
        id: userByUsername.id,
        email: userByUsername.emailAddress,
        username: userByUsername.userName,
        accountNumber: userByUsername.accountNumber,
        identityNumber: userByUsername.identityNumber,
      },
      token,
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { login };
