const {mongoose , Schema}= require("mongoose");
const permissionSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userRoleModel',
        require : true
    },
    endpoint: {
        type: String,
    },
    method: { 
        type: String,
    },
    createAt : {
        type : Date,
        default: Date.now()
    }
})

let permissionModel = mongoose.model("permissions", permissionSchema);
module.exports = permissionModel