Raspi-Network-Utilities

The goal of this project is to provide an easy-to-use set of tools for interacting with a Raspberry Pi-powered network. It includes a server and a Chrome extension, which together allow users to perform network tasks from the comfort of their browser.

Getting Started

Prerequisites

A Raspberry Pi with a Raspbian-based operating system installed
Node.js and npm installed on the Raspberry Pi
A Google Chrome browser

Installing

Clone this repository to your Raspberry Pi:

$ git clone https://github.com/yourusername/Raspi-Network-Utilities.git


Navigate to the project directory and install the necessary dependencies:

$ cd Raspi-Network-Utilities
$ npm install

Create a .env file in the project root directory and include the following information:

WEBPASSWORD=YOUR_PASSWORD
ENDPOINT=http://YOUR_RASPBERRY_PI_IP_ADDRESS:3000/admin

Start the server:
$ npm start

In Google Chrome, go to chrome://extensions/ and enable "Developer mode".

Click on "Load unpacked" and select the ext directory from the Raspi-Network-Utilities project.

Open the extension popup by clicking on the browser action icon in the top right corner of the browser.

Enter a domain in the form and click "Submit" to manually whitelist the domain.

Deployment

This project is meant to be run on a local network, and as such does not include any security measures to protect against malicious requests. It is recommended to only use it on networks you trust.

Built With

Node.js - The JavaScript runtime used for the server
Express - The web framework used for the server
Axios - The HTTP client used for making requests
Google Chrome - The browser used for the extension