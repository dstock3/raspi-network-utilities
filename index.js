const express = require("express");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { exec } = require('child_process');
const FastSpeedtest = require("fast-speedtest-api");
const port = process.env.PORT || 3000;
const funct = require("./functions/apiFunctions");
const { processRoute, processTryCatch, getSpeedRating } = require("./functions/helper");

app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

app.get("/speedtest", async (req, res) => {
  try {
    const speedtest = new FastSpeedtest({
      token: process.env.SPEEDTEST_TOKEN, // required
      verbose: false, // default: false
      timeout: 10000, // default: 5000
      https: true, // default: true
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      unit: FastSpeedtest.UNITS.Mbps, // default: Bps
    });

    const speed = await speedtest.getSpeed();
    const rating = getSpeedRating(speed);
    const roundedSpeed = Math.round(speed);
    res.send({ speed: `${roundedSpeed} Mbps`, rating: rating });
  } catch (error) {
    res.status(500).send({ error: "An error occurred processing the request" });
  }
});

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
};

app.get("/status", async (req, res) => {
  try {
    let data = await processRoute(funct.apiFunctions.summary.name)
    res.send({ status: data.status });
  } catch (error) {
    res.status(500).send({ error: "An error occurred processing the request" });
  }
});

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