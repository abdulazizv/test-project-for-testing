const config = require("config");

async function uploadImages(req, res) {
  try {
    const images = [];

    if (req.files) {
      req.files.forEach((obj) => {
        images.push(obj.filename);
      });
    }
    const resp = `${config.get('link')}/${req.files[0].filename}`
    res.status(201).send({ message: "OK",data: resp });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  uploadImages,
};
