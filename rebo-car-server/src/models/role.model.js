const {mongoose , Schema}= require("mongoose");

const userroleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : { 
        type: String,
    },
    createAt : {
        type : Date,
        default: Date.now()
    }
})

let userRoleModel = mongoose.model("roles", userroleSchema);

module.exports = userRoleModel; 