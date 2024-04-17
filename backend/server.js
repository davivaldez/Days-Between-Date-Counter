const express = require("express");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const PORT =  process.env.PORT || 3000

const baseDirectory = path.join(__dirname, "../frontend/public");

app.use("/css", express.static(path.join(baseDirectory, "css")));
app.use("/js", express.static(path.join(baseDirectory, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(baseDirectory, "index.html"));
})

app.post("/date", (req, res) => {
  const dateStartBody = req.body.dateStartBody;
  const dateFinalBody = req.body.dateFinalBody;

  const dateStart = dayjs(dateStartBody);
  const dateFinal = dayjs(dateFinalBody);

  res.send(dateFinal.diff(dateStart, "day").toString());
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}) 
