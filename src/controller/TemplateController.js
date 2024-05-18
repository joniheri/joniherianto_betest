const template = async (req, res) => {
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
