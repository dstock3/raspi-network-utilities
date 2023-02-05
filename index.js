const dotenv = require('dotenv');
dotenv.config();

const PiHole = require('pihole');

const pihole = new PiHole(process.env.WEBPASSWORD);
console.log(pihole)
let lastActivity = Date.now();

setInterval(() => {
  if (Date.now() - lastActivity >= 5 * 60 * 1000) {
    console.log("no activity");
  }
}, 60 * 1000);

const updateLastActivity = () => {
  lastActivity = Date.now();
};

const criteria = {
  add: {
    requestThreshold: 100,
    timeWindow: 'day',
  },
  remove: {
    requestThreshold: 10,
    timeWindow: 'week',
  },
};

async function processData(data) {
  for (const domain in data.domains) {
    console.log(domain)
    if (data.domains[domain].count > criteria.add.requestThreshold) {
      try {
        await pihole.block(domain);
        console.log(`Added ${domain} to the blocklist`);
      } catch (error) {
        console.error(`Failed to add ${domain} to the blocklist: ${error}`);
      }
    } else if (data.domains[domain].count < criteria.remove.requestThreshold) {
      try {
        await pihole.unblock(domain);
        console.log(`Removed ${domain} from the blocklist`);
      } catch (error) {
        console.error(`Failed to remove ${domain} from the blocklist: ${error}`);
      }
    }
  }
}

async function main() {
  try {
    const data = await pihole.getData();
    console.log(data);
    await processData(data);
    updateLastActivity();
  } catch (error) {
    console.error(`Failed to retrieve data from the API: ${error}`);
  }
}

setInterval(main, 1000 * 60 * 60);

