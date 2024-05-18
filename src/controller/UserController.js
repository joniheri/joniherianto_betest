const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { userData: userDummy } = require('../data/DataDummies');
const { user: UserModel } = require('../models/UserModel');

const getUserDummy = async (_, res) => {
  try {
    return res.send({
      status: 'success',
      message: `get example data dummy Success`,
      data: userDummy,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      return res.status(400).send({
        status: 'fail',
        message: `Get users Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Get users Success`,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const dataInput = req.body;

    // Check duplicate username
    const userByUsername = await UserModel.findOne({
      userName: dataInput.userName,
    });
    if (userByUsername) {
      return res.status(400).send({
        status: 'fail',
        message: `User with User Name:${dataInput.userName} Already Exist`,
      });
    }

    // Check duplicate Email
    const userByEmail = await UserModel.findOne({
      emailAddress: dataInput.emailAddress,
    });
    if (userByEmail) {
      return res.status(400).send({
        status: 'fail',
        message: `User with Email:${dataInput.userName} Already Exist`,
      });
    }

    // Process Insert
    const insertData = await UserModel.create({
      userName: dataInput.userName,
      accountNumber: dataInput.accountNumber,
      emailAddress: dataInput.emailAddress,
      identityNumber: dataInput.identityNumber,
      password: await bcrypt.hash(dataInput.password, 10),
    });
    if (!insertData) {
      return res.status(400).send({
        status: 'fail',
        message: `Add user Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Add user Success`,
      data: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.errors,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let dataInput;

    if (!req.body.password) {
      dataInput = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
      };
    } else {
      dataInput = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber: req.body.identityNumber,
        password: await bcrypt.hash(req.body.password, 10),
      };
    }

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }

    // Check ID user already exist
    const userById = await UserModel.findById(id);
    if (!userById) {
      return res.status(401).send({
        status: 'fail',
        message: `User not found`,
      });
    }

    // Process Update
    const deleteUser = await UserModel.findByIdAndUpdate(id, dataInput, {
      new: true,
      runValidators: true,
    });
    if (!deleteUser) {
      return res.status(401).send({
        status: 'fail',
        message: `Delete data Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Update user Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }

    // Check ID user already exist
    const userById = await UserModel.findById(id);
    if (!userById) {
      return res.status(401).send({
        status: 'fail',
        message: `User not found`,
      });
    }

    // Process Delete
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(401).send({
        status: 'fail',
        message: `Delete data Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Delete user Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.message,
    });
  }
};

module.exports = {
  getUserDummy,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
