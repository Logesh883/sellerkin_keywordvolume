const express = require("express");
const setKeyword = require("../Controllers/setKeywords");
const getkeywords = require("../Controllers/getKeywords");
const router = express.Router();

router.post("/setkeyword", setKeyword);
router.get("/getkeyword", getkeywords);

module.exports = router;
