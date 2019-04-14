const express = require('express');
const router = express.Router();
const parseQueryString = require('../../middleware/parseQueryString')

/* GET users listing. */
router.get('/', parseQueryString, async (req, res, next) => {
  try {
    const additionalWhereClause = req.parsed.whereClause ? `where ${req.parsed.whereClause}` : '';
    const limitClause = req.parsed.limitResult || '';;
    const sql = `select ${req.parsed.fields} from das.user_info_tbl ${additionalWhereClause} ${limitClause}`;
    const result = await dasdb.query(sql,[]); 
    res.sendResult(result);
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
});

/* GET users with SBS_USER_ID = userid */
router.get('/:userid', parseQueryString, async (req, res, next) => {
  try {
    const userid = req.params.userid;
    const additionalWhereClause = req.parsed.whereClause ? `and ${req.parsed.whereClause}` : '';
    const limitClause = req.parsed.limitResult || '';;
    const sql = `select ${req.parsed.fields} from das.user_info_tbl where SBS_USER_ID = ? ${additionalWhereClause} ${limitClause}`;
    const params = [userid];
    const result = await dasdb.query(sql, params); 
    res.sendResult(result);
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
})

/* predefined views */
router.use('/view/:viewName', (req, res, next) => {
  try{
    require(`./view_${req.params.viewName}`)(req, res, next);
  } catch(err) { 
    global.logger.error(err);
  }
}) 

/* insert into table */
router.post('/', async(req,res,next) => {
  try{
    const columns = Object.keys(req.body).join(',');
    const values = new Array(Object.keys(req.body).length).fill('?').join(',');
    const params = Object.values(req.body);
    const sql = `insert into das.user_info_tbl (${columns}) values (${values})`
    const affectedRows = await dasdb.execute(sql, params); 
    res.sendResult({affectedRows});
  }catch(err){
    global.logger.error(err);
    res.sendError(err);
  }
})

/* delete from table */
router.delete('/:userid', async(req,res,next) => {
  try {
    const userid = req.params.userid;
    const sql = `delete from das.user_info_tbl where USER_NUM = ?`;
    const params = [userid];
    const affectedRows = await dasdb.execute(sql, params); 
    res.sendResult({affectedRows});
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
})

/* update table */
router.patch('/:userid', async(req,res,next) => {
  try {
    const columnClauses = Object.keys(req.body).map(column => {
      return `${column} = ?`
    }).join(',');
    global.logger.debug(columnClauses)
    const updateValues = Object.values(req.body);
    const userid = req.params.userid;
    const sql = `update das.user_info_tbl set ${columnClauses} where USER_NUM = ?`;
    const params = [...updateValues, userid];
    const affectedRows = await dasdb.execute(sql, params); 
    global.logger.info(affectedRows);
    res.sendResult({affectedRows}); 
  } catch(err) {
    global.logger.error(err);
    res.sendError(err);
  }
})

module.exports = router; 