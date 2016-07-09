var fs = require('fs');
module.exports = function(request,response){
  var contentType, file, utf8;

  var checkContentType = function(s){
    if (s === '/'){
      return ['text/html','/views/index.html','utf8'];
    }else if (s.indexOf('.css') > -1){
      return ['text/css',s,'utf8'];
    }else if (s.indexOf('.html') > -1){
      return ['text/html','/views' + s,'utf8'];
    }else if (s.indexOf('.js') > -1){
      return ['text/javascript',s,'utf8'];
    }else if (s.indexOf('.jpg') > -1 || s.indexOf('.jpeg') > -1 || s.indexOf('.png') > -1){
      return ['image/*',s, null];
    }else {
      return false;
    }
  }

  var error = function() {
    fs.readFile('./views/error.html', 'utf8', function(errors, contents) {
      response.writeHead(404, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
      return
    })
  }

  var contentTypeArray = checkContentType(request.url);

  if (!contentTypeArray){
    return error()
  }

  contentType = contentTypeArray[0];
  file = contentTypeArray[1];
  utf8 = contentTypeArray[2];
  fs.readFile("."+file, utf8, function(errors, contents){
    response.writeHead(200, {'Content-Type': contentType});
    try{
      response.write(contents);

    }catch(e){
      console.log(e);
      return error();
    }
    response.end();
  })
}


