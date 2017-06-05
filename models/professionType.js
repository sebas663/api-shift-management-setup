var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var ProfessionSchema = new Schema({
        code: String,
        description: String,
        enable:{ type: Boolean, default: true }
});
// the schema is useless so far
// we need to create a model using it
var Profession = mongoose.model('Profession', ProfessionSchema);

// make this available to our users in our Node applications
module.exports = Profession;