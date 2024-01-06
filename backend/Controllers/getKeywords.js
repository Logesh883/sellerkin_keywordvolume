const errHandling = require("../Middlewares/err_handler");
const keywordSchema = require("../Model/keywordSchema");

const getkeywords = async (req, res, next) => {
  try {
    const keyworddata = await keywordSchema.find({}).select("-_id");
    res.json(keyworddata);
  } catch (err) {
    next(errHandling(401, "keywordList not fetched"));
  }
};
module.exports = getkeywords;
