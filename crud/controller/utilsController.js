const searchUser = async (req, res) => {
  try {
    console.log("hola");
    console.log(req.body);

    res.json({ msg: "Hola" });
  } catch (err) {
    res.status(500).json({ err: "Something went wrong" });
  }
};

export { searchUser };
