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
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema);

var dados = {
  name: 'Heineken',
  description: 'Até q eh boazinha',
  alcohol: 5.5,
  category: 'lager'
}

var model = new Beer(dados);

model.save(function (err, data) {
  if (err){
    console.log('Erro: ', err);
  }
  console.log('Cerveja Inserida', data);
});
