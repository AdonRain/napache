module.exports=function (pathName,files){
    var noTail=pathName.substring(0,pathName.lastIndexOf('/')),
        toParent=noTail.indexOf('/')===-1?'/':noTail,
        toChild=pathName==='/'?pathName:pathName+'/',

        html='<!DOCTYPE html><html><head><meta charset="UTF-8">' +
            '<title>'+ pathName +'</title><style>' +
            'body{' +
                'font-family:Arial;' +
                'font-size:16px;' +
                'line-height:200%;' +
                'padding:20px;' +
            '}' +
            '</style></head><body>' +
            '<a href=" ' + toParent + ' ">··/</a><br>';

    for(var i=0;i<files.length;i++){
        html+=' <a href=" ' + toChild + files[i] + 
            ' "> ' + files[i] +
            ' </a> ' + ' <br> ';
    }

    return html+='</body></html>';
};
