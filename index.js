const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PiHole = require("pihole");
const axios = require('axios');
const port = process.env.PORT || 3000;



app.get("/queries", async (req, res) => {
  //Get DNS queries data
  let QUERY_ENDPOINT = process.env.ENDPOINT + '?getAllQueries&auth=' + process.env.WEBPASSWORD

  let response = await axios.get(QUERY_ENDPOINT);

  let data = response["data"]["data"];
  console.log(data)
  
  res.send(data);
});

app.get("/query-types", async (req, res) => {
  //Shows number of queries that the Pi-hole's DNS server has processed
  let QUERYTYPE_ENDPOINT = process.env.ENDPOINT + '?getQueryTypes&auth=' + process.env.WEBPASSWORD

  let response = await axios.get(QUERYTYPE_ENDPOINT);
  console.log(response["data"])

  res.send(response["data"]);
});





/*

const cors = require('cors');

app.use(cors());

app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:3000',
}));

let logs = [];

let lastActivity = Date.now();

setInterval(() => {
  if (Date.now() - lastActivity >= 5 * 60 * 1000) {
    console.log("no activity");
    logs.push("no activity");
  }
}, 60 * 1000);

const updateLastActivity = () => {
  lastActivity = Date.now();
};

const criteria = {
  add: {
    requestThreshold: 100,
    timeWindow: "day",
  },
  remove: {
    requestThreshold: 10,
    timeWindow: "week",
  },
};

async function processData(data) {
  for (const domain in data.domains) {
    console.log(domain);
    logs.push(domain);
    if (data.domains[domain].count > criteria.add.requestThreshold) {
      try {
        await pihole.block(domain);
        console.log(`Added ${domain} to the blocklist`);
        logs.push(`Added ${domain} to the blocklist`);
      } catch (error) {
        console.error(`Failed to add ${domain} to the blocklist: ${error}`);
        logs.push(`Failed to add ${domain} to the blocklist: ${error}`);
      }
    } else if (data.domains[domain].count < criteria.remove.requestThreshold) {
      try {
        await pihole.unblock(domain);
        console.log(`Removed ${domain} from the blocklist`);
        logs.push(`Removed ${domain} from the blocklist`);
      } catch (error) {
        console.error(`Failed to remove ${domain} from the blocklist: ${error}`);
        logs.push(`Failed to remove ${domain} from the blocklist: ${error}`);
      }
    }
  }
}

async function main() {
  try {
    const pihole = new PiHole(process.env.WEBPASSWORD);
    console.time("Data retrieval and processing time");
    const data = await pihole.getAllQueries();
    console.log(data);
    logs.push(data);
    await processData(data);
    updateLastActivity();
    console.timeEnd("Data retrieval and processing time");
  } catch (error) {
    console.error(`Failed to retrieve data from the API: ${error}`);
    logs.push(`Failed to retrieve data from the API: ${error}`);
  }
}

setInterval(main, 1000 * 60 * 60);

app.get("/logs", (req, res) => {
  res.send(logs);
});

app.get("/queries", async (req, res) => {
  
  try {
    const pihole = new PiHole(process.env.WEBPASSWORD);
    const data = await pihole.getAllQueries();
    res.send(data);
  } catch (error) {
    console.error(`Failed to retrieve data from the API: ${error}`);
    res.send(`Failed to retrieve data from the API: ${error}`);
  }
});


*/

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
