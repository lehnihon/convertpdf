const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

var jsonParser = bodyParser.json();
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.post("/pdf-to-image", jsonParser, async (req, res) => {
  const { fromBase64 } = require("pdf2pic");
  const { pdf } = req.body;

  if (!pdf) {
    return res
      .status(400)
      .json({ message: "Envie o input body pdf em base64" });
  }

  const options = {
    density: 100,
    format: "jpg",
    width: 1200,
    height: 1800,
  };

  const convert = fromBase64(pdf, options);
  const image = await convert(1, true);

  return res.status(200).json({ image: image.base64 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
