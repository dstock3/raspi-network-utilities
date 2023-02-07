const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const funct = require("./functions/apiFunctions");
const { processRoute } = require("./functions/helper");

for (const key in funct.apiFunctions) {
  const thisFunction = funct.apiFunctions[key]
  if (thisFunction.nested) {
    app.get(thisFunction.route, async (req, res) => {
      let data = await processRoute(thisFunction.name)
      res.send(data["data"]);
    });
  } else {
    app.get(thisFunction.route, async (req, res) => {
      let data = await processRoute(thisFunction.name)
      res.send(data);
    });
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


