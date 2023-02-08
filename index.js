const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const funct = require("./functions/apiFunctions");
const { processTryCatch } = require("./functions/helper");

for (const key in funct.apiFunctions) {
  const thisFunction = funct.apiFunctions[key]
  if (thisFunction.nested) {
    app.get(thisFunction.route, async (req, res) => {
      processTryCatch(res, thisFunction, thisFunction.nested)
    });
  } else {
    app.get(thisFunction.route, async (req, res) => {
      processTryCatch(res, thisFunction)
    });
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});