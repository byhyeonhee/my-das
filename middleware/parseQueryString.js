module.exports = (req, res, next) => {
    const fields = req.query.fields || '*';
    const whereClause = req.query.q ? `${mkWhereClause(req.query.q)}` : '';
    const limitResult = req.query.limit ? `FETCH FIRST ${req.query.limit} ROWS ONLY` : '';

    req.parsed = {
        'fields' : fields,
        'whereClause' : whereClause,
        'limitResult' : limitResult
    }
    next();
}

function mkWhereClause(clause) {
    const replaced = clause.replace(/-eq/gi, '=')
                    .replace(/-net/gi, "<>")
                    .replace(/-lt/gi, "<")
                    .replace(/-gt/gi, ">")
                    .replace(/-le/gi, "<=")
                    .replace(/-ge/gi, ">=");
    return replaced;                       
}