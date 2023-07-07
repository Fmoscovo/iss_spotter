// index2.js
const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (const pass of passTimes) {
      const datetime = new Date(pass.risetime * 1000);
      console.log(`Next pass at ${datetime} for ${pass.duration} seconds!`);
    }
  })
  .catch((error) => {
    console.log(
      `An error occurred while retrieving the next ISS pass times in the function 'nextISSTimesForMyLocation': ${error.message}`
    );
  });
