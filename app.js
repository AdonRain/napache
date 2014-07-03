var http=require('http'),
    url=require('url'),
    fs=require('fs'),
    path=require('path'),
    depon=require('./depon');

http.createServer(function (req,res){
    var pathName=url.parse(req.url).pathname,
        norPath=path.normalize(pathName.replace(/\.\./g,'')),
        realPath=path.join(depon.config.dir,norPath.replace(/\\/g,'/'));

    fs.stat(realPath,function (err,stats){
        if(err){
            res.writeHead(404,'Not Found',{"Content-Type":"text/plain"});
            res.write('err 404.');
            res.end();
            console.log('404: '+pathName);
        }else{
            if(stats.isDirectory()){
                fs.readdir(realPath,function (err,files){
                    if(err){
                        res.writeHead(500,{"Content-Type":"text/plain"});
                        res.write('err 500.');
                        res.end();
                        console.log('500: '+pathName);
                    }else{
                        var html=depon.nav(pathName,files);
                        res.writeHead(200,{"Content-Type":"text/html"});
                        res.write(html);
                        res.end();
                        console.log('200: '+pathName);
                    }
                });
            }else{
                var contentType=depon.ctype(realPath);

                if(depon.cache(stats,req,res)){
                    res.writeHead(304, "Not Modified",{"Content-Type":contentType});
                    res.end();
                    console.log('304: '+pathName);
                }else{
                    var stream=depon.compress(realPath,req,res);
                    res.writeHead(200,{"Content-Type":contentType});
                    stream.pipe(res);
                    console.log('200: '+pathName); 
                }
            }
        }
    });
}).listen(depon.config.port,function (){
    console.log('port '+depon.config.port);
});
