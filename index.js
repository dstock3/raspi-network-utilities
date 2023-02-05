const dotenv = require('dotenv');
dotenv.config();
const PiHole = require('pihole');

(async function test() {
    const pihole = new PiHole(process.env.WEBPASSWORD)
    console.log(await pihole.getAllQueries());
    //returning an array of arrays of DNS queries
})();