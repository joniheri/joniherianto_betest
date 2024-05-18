const { userData: exampleDataDummies } = require('../data/DataDummies');

const dataDummy = async (_, res) => {
  try {
    return res.send({
      status: 'success',
      message: `get example data dummy Success`,
      data: exampleDataDummies,
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { dataDummy };
