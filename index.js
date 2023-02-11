const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const funct = require("./functions/apiFunctions");
const { processRoute, processTryCatch } = require("./functions/helper");

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

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

app.get("/domain-count", async (req, res) => {
  try {
    let data = await processRoute(funct.apiFunctions.summary.name)
    res.send({ domains_being_blocked: data.domains_being_blocked });
  } catch (error) {
    res.status(500).send({ error: "An error occurred processing the request" });
  }
});

app.get("/ads-blocked", async (req, res) => {
  try {
    let data = await processRoute(funct.apiFunctions.summary.name)
    res.send({ ads_blocked_today: data.ads_blocked_today });
  } catch (error) {
    res.status(500).send({ error: "An error occurred processing the request" });
  }
});

app.get("/ads-percentage", async (req, res) => {
  try {
    let data = await processRoute(funct.apiFunctions.summary.name)
    res.send({ ads_percentage_today: data.ads_percentage_today });
  } catch (error) {
    res.status(500).send({ error: "An error occurred processing the request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});