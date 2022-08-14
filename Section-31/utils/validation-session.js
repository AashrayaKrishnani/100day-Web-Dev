function getSessionErrorData(req, defaultValues) {
  if (!defaultValues) {
    defaultValues = {};
    defaultValues.title = "";
    defaultValues.content = "";
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: defaultValues.content,
      content: defaultValues.content,
    };
  }

  req.session.inputData = null;

  return sessionInputData;
}

function flashErrorsToSession(req, data, action) {
  req.session.inputData = {
    hasError: true,
    ...data,
  };

  return req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
};
