var fs=require('fs'),
    zlib=require('zlib');

module.exports=function (realPath,req,res){
    var ae=req.headers['accept-encoding']||'',
        rs=fs.createReadStream(realPath),
        stream=rs;

    if(ae.indexOf('gzip')!==-1){
        res.setHeader("Content-Encoding","gzip");
        stream=rs.pipe(zlib.createGzip());
    }else if(ae.indexOf('deflate')!==-1){
        res.setHeader("Content-Encoding","deflate");
        stream=rs.pipe(zlib.createDeflate());
    }

    return stream;
};
