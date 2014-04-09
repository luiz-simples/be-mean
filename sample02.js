var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/workshop');

var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Osvaldinho' });

kitty.save(function (err) {
  if (err){
    console.log('Erro: ', err);
  }

  console.log('meow');
});
