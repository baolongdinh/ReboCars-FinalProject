const { mongoose, Schema } = require('mongoose');

const userAccountSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            require: true
        },
        avatar: {
            type: String
        },
        dateOfBirth: {
            type: Date
        },
        phone: {
            type: String
        },
        driving_license: {
            GPLX_image: {
                type: String
            },
            GPLX_number: {
                type: String
            },
            GPLX_Name: {
                type: String
            },
            DateOfBirth: {
                type: String
            }
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roles',
            require: true
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
let userAccountModel = mongoose.model('users', userAccountSchema);

module.exports = userAccountModel;
