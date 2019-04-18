const express = require('express');
const router = express.Router();
const parseQueryString = require('../../middleware/parseQueryString')

/* GET Master. */
router.get('/:master', parseQueryString, async (req, res, next) => {
  try {
    const additionalWhereClause = req.parsed.whereClause ? `where ${req.parsed.whereClause}` : '';
    const limitClause = req.parsed.limitResult || '';;
    const sql = `select ${req.parsed.fields} from das.metadat_mst_tbl ${additionalWhereClause} ${limitClause}`;
    const result = await dasdb.query(sql,[]);
    res.sendResult(result);
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
});

/* GET Catalog Images. */
router.get('/:catalog', parseQueryString, async (req, res, next) => {
  try {
    const additionalWhereClause = req.parsed.whereClause ? `where ${req.parsed.whereClause}` : '';
    const limitClause = req.parsed.limitResult || '';;
    const sql = `select ${req.parsed.fields} from das.corner_tbl ${additionalWhereClause} ${limitClause}`;
    const result = await dasdb.query(sql,[]);
    res.sendResult(result);
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
});
module.exports = router; 