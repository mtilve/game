var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MoveSchema   = new Schema({
    //_id: String,
    _id: { type: Schema.ObjectId, auto: true},
    move: String,
    kills: String
});

module.exports = mongoose.model('Moves', MoveSchema);