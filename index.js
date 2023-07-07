const request = require("request");
const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("that did not work! =( ", error);
    return;
  }

  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next event is at ${datetime} for ${pass.duration} seconds!`);
  }
});
