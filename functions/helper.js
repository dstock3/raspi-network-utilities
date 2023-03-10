const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const proccessEndpoint = (queryType, pw=process.env.WEBPASSWORD, endpoint=(process.env.ENDPOINT)) => {
    return endpoint + `?${queryType}&auth=${pw}`
}

const processRoute = async (queryType) => {
    let endpoint = proccessEndpoint(queryType)
    let response = await axios.get(endpoint);
    let data = response["data"];
    return data
}

const processTryCatch = async (res, funct, isNested=false) => {
    try {
      let data = await processRoute(funct.name)
      if (isNested) {
        res.send(data["data"]);
      } else { 
        res.send(data); 
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "An error occurred processing the request" });
    }
}

const getSpeedRating = (speed) => {
  if (speed < 5) {
    return "Poor";
  } else if (speed < 25) {
    return "Fair";
  } else if (speed < 50) {
    return "Good";
  } else if (speed < 100) {
    return "Very good";
  } else {
    return "Excellent";
  }
}


module.exports = {
    processRoute,
    processTryCatch,
    getSpeedRating
};