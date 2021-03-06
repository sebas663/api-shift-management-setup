var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var PermissionSchema = new Schema({
        code: String,
        description: String,
        enable:{ type: Boolean, default: true }
}, { bufferCommands: false });

// the schema is useless so far
// we need to create a model using it
var Permission = mongoose.model('permission_type', PermissionSchema);

// make this available to our users in our Node applications
module.exports = Permission;