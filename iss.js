const request = require("request");
const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchCoordsByIP };

/////////////////my previous code///////////////////

// const fetchMyIP = function (callback) {
//   // use request to fetch IP address from JSON API
//   request("https://api.ipify.org?format=json", (error, response, body) => {
//     // error can be set if invalid domain, user is offline, etc.
//     if (error) {
//       callback(error, null);
//       return;
//     }

//     // if non-200 status, assume server error
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//       return;
//     }

//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

// const fetchCoordsByIP = function (ip, callback) {
//   request(`https://ipwho.is/json/${ip}`),
//     (error, response, body) => {
//       if (error) {
//         callback(error, null);
//         return;
//       }
//       if (response.statusCode !== 200) {
//         const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
//         callback(Error(msg), null);
//         return;
//       }
//       const { latitude, longitude } = JSON.parse(body);
//       callback(null, { latitude, longitude });
//     };
// };

// module.exports = { fetchMyIP, fetchCoordsByIP };
