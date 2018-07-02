var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    _id: { type: Schema.ObjectId, auto: true},
    nameWin: String,
    nameLose: String,
    round: String,
    date: String
});

module.exports = mongoose.model('games', GameSchema);