var http=require('http'),
    url=require('url'),
    fs=require('fs'),
    path=require('path'),
    mime=require('./conf/mime').types,
    config=require('./conf/config').base,
    index=require('./conf/index').list;

http.createServer(function (req,res){
    var pathName=url.parse(req.url).pathname,
        realPath=config.dir+pathName;

    fs.stat(realPath,function (err,stats){
        if(err){
            res.writeHead(404,'Not Found',{"content-type":"text/plain"});
            res.write('err 404.');
            res.end();
            console.log('404: '+pathName);
        }else{
            if(stats.isDirectory()){
                fs.readdir(realPath,function (err,files){
                    if(err){
                        res.writeHead(500,{"content-type":"text/plain"});
                        res.write('err 500.');
                        res.end();
                        console.log('500: '+pathName);
                    }else{
                        var html=index(pathName,files);
                        res.writeHead(200,{"content-type":"text/html"});
                        res.write(html);
                        res.end();
                        console.log('200: '+pathName);
                    }
                });
            }else{
                fs.readFile(realPath,'binary',function (err,file){
                    if(err){
                        res.writeHead(500,{"content-type":"text/plain"});
                        res.write('err 500.');
                        res.end();
                        console.log('500: '+pathName);
                    }else{
                        var extname=path.extname(realPath),
                            ext=extname?extname.slice(1):'unknown',
                            contentType=mime[ext] ||'text/plain';

                        res.writeHead(200,{"content-type":contentType});
                        res.write(file,'binary');
                        res.end();
                        console.log('200: '+pathName);
                    }
                });   
            }
        }
    });
}).listen(config.port,function (){
    console.log('port '+config.port);
});
