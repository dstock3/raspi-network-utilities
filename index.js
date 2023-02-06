const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PiHole = require("pihole");
const pihole = new PiHole(process.env.WEBPASSWORD);
const port = process.env.PORT || 3000;

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

app.get("/logs", (req, res) => {
  res.send(logs);
});

async function main() {
  try {
    console.time("Data retrieval and processing time");
    const data = await pihole.getData();
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
