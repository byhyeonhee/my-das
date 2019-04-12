const express = require('express');
const router = express.Router();
const parseQueryString = require('../../middleware/parseQueryString')

/* GET users listing. */
router.get('/', parseQueryString, async (req, res, next) => {
  try {
    const sql = `select ${req.parsed.fields} from das.user_info_tbl ${req.parsed.additionalSQL}`;
    console.log(sql)
    const result = await dasdb.query(sql,[]); 
    //console.log(result)
    res.send(result);
  } catch(err) {
    console.error(err);
    res.send({msg:'fail'});
  }
});

router.get('/:userid', parseQueryString, async (req, res, next) => {
  try {
    const userid = req.params.userid;
    const sql = `select ${req.parsed.fields} from das.user_info_tbl where SBS_USER_ID = ? ${req.parsed.additionalSQL}`;
    const params = [userid];
    const result = await dasdb.query(sql, params); 
    console.log(result) 
    res.send(result); 
  } catch(err) {
    console.error(err);
    res.send({msg:'fail'});
  }
})


router.use('/view/:viewName', (req, res, next) => {
  console.log(req.params.viewName);
  try{
    require(`./view_${req.params.viewName}`)(req, res, next);
  } catch(err) { 
    console.log(err);
  }
}) 


module.exports = router; 