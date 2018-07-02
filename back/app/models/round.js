var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RoundSchema   = new Schema({
    Id: String,
    Winner: String,
    Round: String,
    Date: String
});

module.exports = mongoose.model('Rounds', RoundSchema);