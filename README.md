Introduction

This is a Node.js script designed to manage a domain blocklist using the Pi-hole API. The script leverages the PiHole library to interact with the API, performing block and unblock actions as necessary. It employs an interval timer to regularly invoke the main function every hour.

Functionality

The main function of the script retrieves data from the Pi-hole API about the requested domains. This data is then processed using the processData function, which checks each domain against a set of predefined criteria for blocking or unblocking. These criteria are stored in an object named criteria. If a domain has a request count that exceeds the "requestThreshold" specified in the criteria.add object, the domain will be blocked. Conversely, if a domain's request count is below the "requestThreshold" specified in the criteria.remove object, the domain will be unblocked.

To securely access the Pi-hole API, the script utilizes the dotenv library to load environment variables, including the web password and URL for the API. Additionally, the script monitors the last recorded activity using the lastActivity variable and employs another interval timer to verify if there has been any activity in the last 5 minutes. If there is no activity, a message is logged to the console. The updateLastActivity function updates the value of lastActivity whenever it is called.

Code Details

The script starts by importing the dotenv and pihole packages. The dotenv package is used to load environment variables from a .env file, while the PiHole class provides an interface to interact with the Pi-hole API.

A global lastActivity variable is defined and initialized with the current time in milliseconds (Date.now()). An interval timer is set to run every 60 seconds, with a callback function that checks if the difference between the current time and lastActivity is greater than or equal to 5 minutes (in milliseconds). If so, the message "no activity" is logged to the console.

The updateLastActivity function updates the value of lastActivity to the current time in milliseconds.

The criteria object contains two properties: add and remove. These properties define the request threshold and time window for adding and removing domains from the blocklist.

The processData function is an asynchronous function that takes one argument, data. The function iterates over the domains in data.domains, and for each domain, it checks if its request count is greater than the requestThreshold specified in the criteria.add object. If it is, the function attempts to block the domain by calling pihole.block(domain). If the block operation is successful, a log message indicating that the domain has been added to the blocklist is output. If it fails, an error message is output to the console. On the other hand, if the domain's request count is less than the requestThreshold specified in the criteria.remove object, the function attempts to unblock the domain by calling pihole.unblock(domain). If the unblock operation is successful, a log message indicating that the domain has been removed from the blocklist is output. If it fails, an error message is output to the console.

The main function is an asynchronous function that retrieves data from the Pi-hole API using pihole.getData(). Upon successful data retrieval, the function logs the retrieved data to the console, and then calls processData with the retrieved data as its argument. This is done to further process the data and determine if any domains require blocking or unblocking based on the defined criteria. After calling processData, the function calls updateLastActivity to update the lastActivity variable with the current time. In the event that the data retrieval fails, an error message indicating the failure is output to the console. The main function is executed every hour through the use of an interval timer. This periodic execution helps to ensure that the domain blocklist remains up-to-date and in line with the defined blocking criteria.