var config=require('./config');

module.exports=function (stats,req,res){
    var expires=new Date(),
        lastModified=stats.mtime.toUTCString(),
        ifModifiedSince='If-Modified-Since'.toLowerCase();

    expires.setTime(expires.getTime()+config.maxAge*1000);
    res.setHeader("Last-Modified",lastModified);
    res.setHeader("Expires",expires.toUTCString());
    res.setHeader("Cache-Control","max-age="+ config.maxAge);

    return req.headers[ifModifiedSince]&&lastModified==req.headers[ifModifiedSince];
};
