
const originWhiteList = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,DELETE,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if(req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
    }
    next();
}   

module.exports = originWhiteList;