function getFlashedData(req) {
  const sessionData = req.session.flashedData;
  req.session.flashedData = null;

  return sessionData;
}

function flashDataToSession(req, data, action) {
  req.session.flashedData = data;
  console.log("Saving this to the session", data);

  req.session.save(action);
}

module.exports = {
  getFlashedData: getFlashedData,
  flashDataToSession: flashDataToSession,
};
