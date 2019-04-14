module.exports = (req, res, next) => {
    res.sendResult = (data) => {
        // result format
        /* {
            success : true or false, (boolean)
            body : result ( array of value('string', 'object') ),
            msg : if err, add msg or '' (string)
        }
        */
        const result = {};
        result.success = true;
        result.body = Array.isArray(data) ? data : [data];
        res.send(result);
    }

    res.sendError = (err, msg) => {
        // result format
        /* {
            success : true or false, (boolean)
            body : result ( array of value('string', 'object') ),
            msg : if err, add msg or '' (string)
        }
        */
        const result = {};
        result.success = false;
        result.body = ''
        result.err = err;
        result.msg = msg || err;

        res.send(result);
    }


    next();
}