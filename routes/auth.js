const jwt = require('jsonwebtoken');

module.exports =  (req, res, next)=>{
    try{
        if(!req.headers.authorization) throw "Forbidden!!!";

        const token = req.headers.authorization.split(" ")[1];

        const playload = jwt.verify(token, process.env.secretToken);
        req.playload = playload;
        next();
    }catch(err){
        res.statut(401).json({
            message: "Forbidden !!!",
        })
    }
}