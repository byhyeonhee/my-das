class IBMDB {
    constructor(db2options, customLogger){
        try {
            // * db2options object
            // "DRIVER":"{DB2}", 
            // "DABASE":"", 
            // "UID":"",
            // "PWD":"",
            // "HOSTNAME":"",
            // "PORT":,
            // "PROTOCOL" : "TCPIP"
            this.logger = customLogger || console;
            this.logger.info(db2options)

            // ibm_db pool
            const Pool = require('ibm_db').Pool;
            this.db2pool = new Pool();
            this.db2cn = '';
            Object.keys(db2options).forEach((key) => {
                this.db2cn +=  key + '=' + db2options[key] + ';' ;
            });
        } catch(err) {
            this.logger.error(err);
        }
    }

    _getConnection() {
        return new Promise((resolve,reject) => {
            try {
                this.db2pool.open(this.db2cn, (err,conn) => {
                    err ? reject(err) : resolve(conn)
                })
            } catch(err) {
                reject(err)
            }
        })
    }

    query(sql, params) {
        return new Promise( async (resolve,reject) => {
            try {
                const conn = await this._getConnection();
                conn.query(sql, params, (err, results) => {
                    if(err){
                        reject(err);
                    } else {
                        this.logger.info(`query excution ok! ${sql} : ${params}`)
                        //this.logger.debug(results);
                        resolve(results);
                        conn.close();
                    }        
                })
            } catch (err) {                
                reject(err);
            }
        })
    }
}

module.exports = IBMDB;

// Test
/*
async function main() {
    try {
        const config = require('./dbconfig.json');
        const dbconfig = config.DB2['DASDEV'];
        const dasdb = new IBMDB(dbconfig);
        const sql = 'select * from das.USER_INFO_TBL';
        const result = await dasdb.query(sql,[]);
        console.log(result[0]);
    } catch(err) {
        console.log(err)
    }
}

main();
*/