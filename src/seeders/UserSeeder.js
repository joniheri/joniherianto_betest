const bcrypt = require('bcrypt');
const { user: UserModel } = require('../models/UserModel');

const userSeederDummy = async (_, res) => {
  try {
    // DataInput
    const dataInput = {
      email: 'admin@email.com',
      username: 'admin',
      fullname: 'Administrator',
      password: await bycrypt.hash('admin', 10),
    };
    // End DataInput

    return res.send({
      status: 'success',
      message: `Seeding user Success`,
      dataUser: dataInput,
    });
  } catch (error) {
    console.log(error);
  }
};

const userSeeder = async (_, res) => {
  try {
    const dataInput = {
      userName: 'admin',
      accountNumber: '1001',
      emailAddress: 'admin@email.com',
      identityNumber: '1',
      password: await bcrypt.hash('admin', 10),
    };

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
    const insertData = await UserModel.create(dataInput);
    if (!insertData) {
      return res.status(400).send({
        status: 'fail',
        message: `Insert user Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Seeding user Success`,
      dataUser: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'fail',
      message: error.errors,
    });
  }
};

module.exports = { userSeederDummy, userSeeder };
