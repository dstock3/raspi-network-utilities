const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const proccessEndpoint = (queryType, pw=process.env.WEBPASSWORD, endpoint=process.env.ENDPOINT) => {
    return endpoint + `?${queryType}&auth=${pw}`
}
  
const processRoute = async (queryType) => {
    let endpoint = proccessEndpoint(queryType)
    let response = await axios.get(endpoint);
    let data = response["data"];
    return data
}

module.exports = {
    processRoute
};