const { noContent, unAuthorized, paymentRequired, forbidden } = require("./msg");

exports.success = function(req, res, status) {
  if (status === 401) {
    res.status(status).json(unAuthorized);
  } else if (status === 402) {
    res.status(status).json(paymentRequired);
  } else if (status === 403) {
    res.status(status).json(forbidden);
  } else if (status === 400) {
    res.status(status).json(req);
  } else if (status === 201) {
    res.status(status).json(req);
  } else if (status === 200) {
    if (req === null) {
      res.status(status).json(noContent);
    } else if (typeof req === "object" && Array.isArray(req) && req.lenght === 0) {
      res.status(status).json(noContent);
    } else if (typeof req === "object" && req === {}) {
      res.status(status).json(noContent);
    } else {
      res.status(status).json(req);
    }
  } else {
    res.status(status).json(req);
  }
};
``;
