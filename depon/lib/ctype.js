var path=require('path');
    mime={
        "html": "text/html",
        "js": "text/javascript",
        "css": "text/css",
        "xml": "text/xml",
        "txt": "text/plain",
        "ico": "image/x-icon",
        "svg": "image/svg+xml",
        "gif": "image/gif",
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "tiff": "image/tiff",
        "json": "application/json",
        "pdf": "application/pdf",
        "swf": "application/x-shockwave-flash",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv"
    };

module.exports=function (realPath){
    var extname=path.extname(realPath),
        ext=extname?extname.slice(1):'unknown',
        contentType=mime[ext] ||'text/plain';

    return contentType;
};
