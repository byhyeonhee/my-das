const express = require('express');
const router = express.Router();
const parseQueryString = require('../../middleware/parseQueryString')

/* GET users listing. */
router.get('/', parseQueryString, async (req, res, next) => {
  try {
    const sql = `select ${req.parsed.fields} from das.user_info_tbl ${req.parsed.additionalSQL}`;
    const result = await dasdb.query(sql,[]); 
    res.send(result);
  } catch(err) {
    console.error(err);
    res.send({msg:'fail'});
  }
});

/* GET users with SBS_USER_ID = userid */
router.get('/:userid', parseQueryString, async (req, res, next) => {
  try {
    const userid = req.params.userid;
    const sql = `select ${req.parsed.fields} from das.user_info_tbl where SBS_USER_ID = ? ${req.parsed.additionalSQL}`;
    const params = [userid];
    const result = await dasdb.query(sql, params); 
    res.send(result); 
  } catch(err) {
    console.error(err);
    res.send({msg:'fail'});
  }
})

/* predefined view */
router.use('/view/:viewName', (req, res, next) => {
  try{
    require(`./view_${req.params.viewName}`)(req, res, next);
  } catch(err) { 
    console.log(err);
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
    res.send([{msg:'post ok', affectedRows}]);  
  }catch(err){
    console.error(err);
    res.send([{msg:'post fail'}]);  
  }
})

/* delete from table */
router.delete('/:userid', async(req,res,next) => {
  try {
    const userid = req.params.userid;
    const sql = `delete from das.user_info_tbl where USER_NUM = ?`;
    const params = [userid];
    const affectedRows = await dasdb.execute(sql, params); 
    console.log(result);
    res.send([{msg:'success', affectedRows}]); 
  } catch(err) {
    console.error(err);
    res.send({msg:'fail'});
  }
})

/* update table */
router.patch('/:userid', async(req,res,next) => {
  try {
    const columnClauses = Object.keys(req.body).map(column => {
      return `${column} = ?`
    }).join(',');
    console.log(columnClauses)
    const updateValues = Object.values(req.body);
    const userid = req.params.userid;
    const sql = `update das.user_info_tbl set ${columnClauses} where USER_NUM = ?`;
    const params = [...updateValues, userid];
    const affectedRows = await dasdb.execute(sql, params); 
    console.log(affectedRows);
    res.send([{msg:'success', affectedRows}]); 
  } catch(err) {
    console.error(err);
    res.send([{msg:'fail'}]);
  }
})

module.exports = router; 