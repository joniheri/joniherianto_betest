const bycrypt = require('bcrypt');

const userSeederDummy = async (_, res) => {
  try {
    // DataInput
    const dataInput = {
      id: '1001',
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
    return console.log(error);
  }
};

module.exports = { userSeederDummy };
