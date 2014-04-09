var http = require('http');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Erro de conexao.', err)
});

db.once('open', function () {
  console.log('Conexão aberta.')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name:        { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol:     { type: Number, min: 0},
  category:    { type: String, default: ''},
  created:     { type: Date,   default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

http.createServer(function (req, res) {
  var url = req.url;

  switch(url) {
    case '/beer/create':
      var dados = {
        name: 'Heineken',
        description: 'Até q eh boazinha',
        alcohol: 5.5,
        category: 'lager'
      }

      var model = new Beer(dados);

      model.save(function (err, data) {
        if (err) {
          console.log('Erro: ', err);
        }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
      });
      break;

    default:
      res.writeHead(401, {'Content-Type': 'text/plain'});
      res.end('not found');

    //case '/retrieve':
    //  Beer.retrieve(request, response);
    //  break;

    //case '/update':
    //  Beer.update(request, response);
    //  break;

    //case '/delete':
    //  Beer.delete(request, response);
    //  break;
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');