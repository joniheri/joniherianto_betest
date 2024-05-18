const template = async (req, res) => {
  try {
    return res.send({
      status: 'success',
      message: `Success`,
    });
  } catch (error) {
    return console.log(error);
  }
};
