const { post: PostModel } = require('../models/PostModel');

const getPosts = async (req, res) => {
  try {
    return res.send({
      status: 'success',
      message: `Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error.message,
    });
  }
};

const addPost = async (req, res) => {
  try {
    const dataInput = req.body;
    const newData = await PostModel.create(dataInput);
    return res.send({
      status: 'success',
      message: `Success`,
      data: newData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'Error catch',
      message: error,
    });
  }
};

module.exports = { getPosts, addPost };
