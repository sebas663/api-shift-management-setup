var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var DocumentTypeSchema = new Schema({
        code :            String,
        description :     String,
        enable :          { type: Boolean, default: true }
}, { bufferCommands: false });
// the schema is useless so far
// we need to create a model using it
var DocumentType = mongoose.model('document_type', DocumentTypeSchema);

// make this available to our users in our Node applications
module.exports = DocumentType;