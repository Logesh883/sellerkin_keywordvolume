const mongoose = require("mongoose");

const keywordSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  month: {
    type: [Number, "Must be String"],
    required: true,
  },
});

module.exports = mongoose.model("keywordlist", keywordSchema);
