const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json").catch((error) => {
    console.log("Error:", error);
  });
};

const fetchCoordsByIP = function (body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`).catch((error) => {
    console.error("Error:", error);
  });
};

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url).catch((error) => {
    console.error("Error:", error);
  });
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

module.exports = { nextISSTimesForMyLocation };
