var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var textSchema = new Schema({
  title:  String,
});

const textModel = mongoose.model('textModel', textSchema);

module.exports = textModel;