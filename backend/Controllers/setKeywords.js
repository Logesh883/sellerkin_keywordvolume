const errHandling = require("../Middlewares/err_handler");
const keywordSchema = require("../Model/keywordSchema");

const setKeyword = async (req, res, next) => {
  const monthyear = [new Date().getMonth(), new Date().getFullYear()];

  try {
    let { keyword } = req.body;

    keyword = keyword.toLowerCase();

    const findkeywordall = await keywordSchema.find({ keyword: keyword });
    const findkeyword = findkeywordall[findkeywordall.length - 1];
    if (!findkeyword) {
      const data = await keywordSchema({
        keyword: keyword,
        count: 1,
        month: monthyear,
      });
      await data.save();
      res.json({ data: data, msg: "Uploaded Successfully" });
    } else {
      if (
        findkeyword.month[0] !== monthyear[0] ||
        findkeyword.month[1] !== monthyear[1]
      ) {
        const data = await keywordSchema({
          keyword: keyword,
          count: 1,
          month: monthyear,
        });
        await data.save();
        res.json({
          data: data,
          msg: "New Month Started and Uploaded Successfully",
        });
      } else {
        count = findkeyword.count;
        findkeyword.name = keyword;
        findkeyword.count = count + 1;
        findkeyword.month = monthyear;
        await findkeyword.save();
        res.json({ data: findkeyword, msg: "Count Increased" });
      }
    }
  } catch (err) {
    next(errHandling(403, err.message || "Error in keywordUpload"));
  }
};

module.exports = setKeyword;
